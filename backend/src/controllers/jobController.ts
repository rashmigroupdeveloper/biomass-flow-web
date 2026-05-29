import { Request, Response } from "express";
import pool from "../config/database";

export interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  responsibilities: string[];
  is_active: boolean;
  posted_date: string;
  closing_date?: string;
  salary_range?: string;
  featured: boolean;
}

/**
 * Build requirements string from vacancy data
 */
const buildRequirements = (vacancy: any): string => {
  const requirements: string[] = [];

  if (vacancy.qualifications_required) {
    requirements.push(`Qualifications: ${vacancy.qualifications_required}`);
  }
  if (vacancy.experience_required) {
    requirements.push(`Experience: ${vacancy.experience_required}`);
  }
  if (vacancy.skills_required) {
    requirements.push(`Skills: ${vacancy.skills_required}`);
  }
  if (vacancy.certifications_required) {
    requirements.push(`Certifications: ${vacancy.certifications_required}`);
  }
  if (vacancy.age_requirement) {
    requirements.push(`Age Requirement: ${vacancy.age_requirement}`);
  }

  return requirements.length > 0
    ? requirements.join("\n\n")
    : "Please refer to the job description for detailed requirements.";
};

/**
 * Build responsibilities array from vacancy data
 */
const buildResponsibilities = (vacancy: any): string[] => {
  const responsibilities: string[] = [];

  if (vacancy.primary_responsibilities) {
    if (typeof vacancy.primary_responsibilities === "string") {
      // Split by newlines if multiple lines
      const lines = vacancy.primary_responsibilities
        .split("\n")
        .filter((line: string) => line.trim());
      if (lines.length > 1) {
        responsibilities.push(...lines);
      } else {
        responsibilities.push(vacancy.primary_responsibilities);
      }
    }
  }

  // Add key result areas if available
  if (vacancy.key_result_areas) {
    try {
      const kras =
        typeof vacancy.key_result_areas === "string"
          ? JSON.parse(vacancy.key_result_areas)
          : vacancy.key_result_areas;

      if (Array.isArray(kras)) {
        kras.forEach((kra: any) => {
          if (typeof kra === "string" && kra.trim()) {
            responsibilities.push(kra);
          }
        });
      }
    } catch {
      // Ignore parsing errors
    }
  }

  if (responsibilities.length === 0) {
    responsibilities.push(
      "Perform duties as assigned by the reporting manager.",
    );
  }

  return responsibilities;
};

/**
 * Build salary range string from vacancy data
 */
const buildSalaryRange = (vacancy: any): string => {
  const parts: string[] = [];

  if (vacancy.fixed_pay) {
    parts.push(`Fixed: ₹${Number(vacancy.fixed_pay).toLocaleString("en-IN")}`);
  }
  if (vacancy.variable_pay) {
    parts.push(`Variable: ${vacancy.variable_pay}`);
  }
  if (vacancy.compensation_band) {
    parts.push(`Band: ${vacancy.compensation_band}`);
  }

  if (parts.length > 0) {
    return parts.join(" | ");
  }

  if (vacancy.additional_benefits) {
    return `Competitive salary with ${vacancy.additional_benefits}`;
  }

  return "As per company standards";
};

/** SQL predicate: vacancies that should appear on the public careers page */
const VACANCY_PUBLIC_PREDICATE = `
  (
    LOWER(TRIM(COALESCE(status, ''))) = 'approved'
    OR (
      approved_by_ceo IS TRUE
      AND ceo_approved_at IS NOT NULL
    )
  )
`;

/**
 * Get all approved vacancies directly from ATS database
 * Matches ATS rows that are approved (case-insensitive status) or CEO-signed-off.
 */
export const getJobListings = async (req: Request, res: Response) => {
  try {
    // Query approved vacancies directly from ATS database
    const query = `
      SELECT
        id,
        title,
        designation,
        department,
        location_of_work,
        job_overview,
        description,
        justification,
        qualifications_required,
        experience_required,
        skills_required,
        certifications_required,
        age_requirement,
        primary_responsibilities,
        key_result_areas,
        fixed_pay,
        variable_pay,
        compensation_band,
        additional_benefits,
        expected_start_date,
        priority,
        created_at,
        ceo_approved_at
      FROM vacancies
      WHERE ${VACANCY_PUBLIC_PREDICATE}
      ORDER BY ceo_approved_at DESC NULLS LAST, created_at DESC
    `;

    const result = await pool.query(query);

    // Transform vacancies to job listing format for frontend
    const jobs: JobListing[] = result.rows.map((vacancy: any) => ({
      id: vacancy.id,
      title: vacancy.title || vacancy.designation || "Position Available",
      department: vacancy.department || "General",
      location: vacancy.location_of_work || "Not Specified",
      type: "Full-time",
      description:
        vacancy.job_overview ||
        vacancy.description ||
        vacancy.justification ||
        "",
      requirements: buildRequirements(vacancy),
      responsibilities: buildResponsibilities(vacancy),
      is_active: true,
      posted_date: vacancy.ceo_approved_at
        ? new Date(vacancy.ceo_approved_at).toISOString().split("T")[0]
        : new Date(vacancy.created_at).toISOString().split("T")[0],
      closing_date: vacancy.expected_start_date
        ? new Date(vacancy.expected_start_date).toISOString().split("T")[0]
        : undefined,
      salary_range: buildSalaryRange(vacancy),
      featured: vacancy.priority === 1,
    }));

    console.log(
      `✅ Fetched ${jobs.length} approved vacancies from ATS database`,
    );
    res.status(200).json(jobs);
  } catch (error: any) {
    console.error(
      "Error fetching job listings from ATS database:",
      error?.message || error,
    );
    // Do not return 200 + [] — that hides outages and looks like "no open roles"
    res.status(503).json({
      error: "JOBS_UNAVAILABLE",
      message:
        "Unable to load job listings from the careers database. Please try again later.",
    });
  }
};

/**
 * Get a specific job by ID from ATS database
 */
export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jobId = parseInt(id, 10);

    if (isNaN(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const query = `
      SELECT
        id,
        title,
        designation,
        department,
        location_of_work,
        job_overview,
        description,
        justification,
        qualifications_required,
        experience_required,
        skills_required,
        certifications_required,
        age_requirement,
        primary_responsibilities,
        key_result_areas,
        fixed_pay,
        variable_pay,
        compensation_band,
        additional_benefits,
        expected_start_date,
        priority,
        created_at,
        ceo_approved_at
      FROM vacancies
      WHERE id = $1 AND ${VACANCY_PUBLIC_PREDICATE}
    `;

    const result = await pool.query(query, [jobId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    const vacancy = result.rows[0];

    // Transform to job listing format
    const job: JobListing = {
      id: vacancy.id,
      title: vacancy.title || vacancy.designation || "Position Available",
      department: vacancy.department || "General",
      location: vacancy.location_of_work || "Not Specified",
      type: "Full-time",
      description:
        vacancy.job_overview ||
        vacancy.description ||
        vacancy.justification ||
        "",
      requirements: buildRequirements(vacancy),
      responsibilities: buildResponsibilities(vacancy),
      is_active: true,
      posted_date: vacancy.ceo_approved_at
        ? new Date(vacancy.ceo_approved_at).toISOString().split("T")[0]
        : new Date(vacancy.created_at).toISOString().split("T")[0],
      closing_date: vacancy.expected_start_date
        ? new Date(vacancy.expected_start_date).toISOString().split("T")[0]
        : undefined,
      salary_range: buildSalaryRange(vacancy),
      featured: vacancy.priority === 1,
    };

    res.status(200).json(job);
  } catch (error: any) {
    console.error("Error fetching job by ID:", error.message);
    res.status(500).json({ message: "Error fetching job by ID" });
  }
};

/**
 * Create or update a job listing from ATS system
 * This endpoint is called by the ATS when a vacancy is approved
 */
export const syncJobFromATS = async (req: Request, res: Response) => {
  try {
    const {
      ats_vacancy_id,
      title,
      department,
      location,
      type = "Full-time",
      description,
      requirements,
      responsibilities = [],
      is_active = true,
      closing_date,
      salary_range,
      featured = false,
    } = req.body;

    // Validate required fields
    if (
      !ats_vacancy_id ||
      !title ||
      !department ||
      !location ||
      !description ||
      !requirements
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: ats_vacancy_id, title, department, location, description, requirements",
      });
    }

    // Check if job already exists (by ats_vacancy_id)
    const checkQuery = "SELECT id FROM job_listings WHERE ats_vacancy_id = $1";
    const checkResult = await pool.query(checkQuery, [ats_vacancy_id]);

    let job;
    if (checkResult.rows.length > 0) {
      // Update existing job
      const updateQuery = `
        UPDATE job_listings
        SET
          title = $1,
          department = $2,
          location = $3,
          type = $4,
          description = $5,
          requirements = $6,
          responsibilities = $7,
          is_active = $8,
          closing_date = $9,
          salary_range = $10,
          featured = $11,
          updated_at = NOW()
        WHERE ats_vacancy_id = $12
        RETURNING *
      `;

      const updateResult = await pool.query(updateQuery, [
        title,
        department,
        location,
        type,
        description,
        requirements,
        JSON.stringify(responsibilities),
        is_active,
        closing_date || null,
        salary_range || null,
        featured,
        ats_vacancy_id,
      ]);

      job = updateResult.rows[0];
      console.log(
        `✅ Updated job listing for ATS vacancy ID: ${ats_vacancy_id}`,
      );
    } else {
      // Insert new job
      const insertQuery = `
        INSERT INTO job_listings (
          ats_vacancy_id,
          title,
          department,
          location,
          type,
          description,
          requirements,
          responsibilities,
          is_active,
          closing_date,
          salary_range,
          featured
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
      `;

      const insertResult = await pool.query(insertQuery, [
        ats_vacancy_id,
        title,
        department,
        location,
        type,
        description,
        requirements,
        JSON.stringify(responsibilities),
        is_active,
        closing_date || null,
        salary_range || null,
        featured,
      ]);

      job = insertResult.rows[0];
      console.log(
        `✅ Created new job listing for ATS vacancy ID: ${ats_vacancy_id}`,
      );
    }

    // Transform responsibilities from JSONB to array
    job.responsibilities = Array.isArray(job.responsibilities)
      ? job.responsibilities
      : typeof job.responsibilities === "string"
        ? JSON.parse(job.responsibilities)
        : [];

    res.status(200).json({
      success: true,
      message:
        checkResult.rows.length > 0
          ? "Job updated successfully"
          : "Job created successfully",
      job,
    });
  } catch (error: any) {
    console.error("Error syncing job from ATS:", error);
    res.status(500).json({
      success: false,
      message: "Error syncing job from ATS",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * Delete or deactivate a job listing when vacancy is removed from ATS
 */
export const removeJobFromATS = async (req: Request, res: Response) => {
  try {
    const { ats_vacancy_id } = req.body;

    if (!ats_vacancy_id) {
      return res
        .status(400)
        .json({ message: "Missing required field: ats_vacancy_id" });
    }

    // Deactivate the job instead of deleting (soft delete)
    const updateQuery = `
      UPDATE job_listings
      SET is_active = false, updated_at = NOW()
      WHERE ats_vacancy_id = $1
      RETURNING id
    `;

    const result = await pool.query(updateQuery, [ats_vacancy_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job listing not found" });
    }

    console.log(
      `✅ Deactivated job listing for ATS vacancy ID: ${ats_vacancy_id}`,
    );
    res.status(200).json({
      success: true,
      message: "Job deactivated successfully",
    });
  } catch (error: any) {
    console.error("Error removing job from ATS:", error);
    res.status(500).json({
      success: false,
      message: "Error removing job from ATS",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
