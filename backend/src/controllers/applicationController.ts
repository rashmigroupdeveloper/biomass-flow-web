import { Request, Response } from "express";
import Joi from "joi";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import {
  sendJobApplicationEmail,
  JobApplicationData,
} from "../services/emailService";
import pool from "../config/database";

// Enhanced validation schema for application data
const applicationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-Z\s.'-]+$/)
    .messages({
      "string.pattern.base":
        "First name can only contain letters, spaces, dots, hyphens, and apostrophes",
    }),
  lastName: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-Z\s.'-]+$/)
    .messages({
      "string.pattern.base":
        "Last name can only contain letters, spaces, dots, hyphens, and apostrophes",
    }),
  email: Joi.string().email().required().trim().max(255),
  phone: Joi.string()
    .required()
    .trim()
    .pattern(/^[\+]?[0-9\s\-\(\)]{7,20}$/)
    .messages({
      "string.pattern.base": "Please enter a valid phone number",
    }),
  position: Joi.string().required().trim().min(2).max(255),
  department: Joi.string().allow("").trim().max(100),
  experience: Joi.string().allow("").trim().max(500),
  education: Joi.string().allow("").trim().max(500),
  coverLetter: Joi.string().allow("").trim().max(5000),
  source: Joi.string().allow("").trim().max(100),
  vacancyId: Joi.alternatives()
    .try(Joi.number().integer().positive(), Joi.string().pattern(/^\d+$/))
    .allow("", null), // Optional: ID of the vacancy being applied for
});

// In-memory store for applications (since we removed database storage)
export const applicationSubmissionsStore: JobApplicationData[] = [];

/**
 * Insert candidate into ATS database
 * This syncs the application directly to the ATS system
 */
const insertCandidateToATS = async (applicationData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department?: string;
  experience?: string;
  education?: string;
  coverLetter?: string;
  source?: string;
  vacancyId?: number;
}): Promise<{ success: boolean; candidateId?: number; error?: string }> => {
  try {
    const fullName = `${applicationData.firstName} ${applicationData.lastName}`;

    // Check if candidate already exists by email
    const existingCheck = await pool.query(
      "SELECT id FROM candidates WHERE email = $1",
      [applicationData.email],
    );

    if (existingCheck.rows.length > 0) {
      console.log(
        `Candidate with email ${applicationData.email} already exists in ATS`,
      );
      return {
        success: true,
        candidateId: existingCheck.rows[0].id,
        error: "Candidate already exists",
      };
    }

    // Insert new candidate
    const insertQuery = `
      INSERT INTO candidates (
        name, email, phone, experience, education,
        current_designation, department, source,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id
    `;

    const values = [
      fullName,
      applicationData.email,
      applicationData.phone || "",
      applicationData.experience || "",
      applicationData.education || "",
      applicationData.position, // Current designation = position they applied for
      applicationData.department || "",
      applicationData.source || "Koove Organic Career Page",
    ];

    const result = await pool.query(insertQuery, values);
    const candidateId = result.rows[0].id;

    console.log(
      `✅ Candidate inserted into ATS database with ID: ${candidateId}`,
    );

    // If vacancy ID is provided, create an interview record to link candidate to vacancy
    if (applicationData.vacancyId) {
      try {
        // Get vacancy title for the interview record
        const vacancyResult = await pool.query(
          "SELECT title FROM vacancies WHERE id = $1",
          [applicationData.vacancyId],
        );

        if (vacancyResult.rows.length > 0) {
          const jobRole = vacancyResult.rows[0].title;

          // Create initial interview record with "Applied" status
          await pool.query(
            `
            INSERT INTO interviews (
              candidate_id, job_role, status, notes,
              interview_date, interview_time,
              created_at, updated_at
            ) VALUES ($1, $2, $3, $4, CURRENT_DATE, '00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `,
            [
              candidateId.toString(),
              jobRole,
              "Applied",
              `Applied via Koove Organic Career Page on ${new Date().toLocaleDateString()}`,
            ],
          );

          console.log(
            `✅ Interview record created linking candidate ${candidateId} to vacancy ${applicationData.vacancyId}`,
          );
        }
      } catch (interviewError: any) {
        console.error(
          "Error creating interview record:",
          interviewError.message,
        );
        // Don't fail the whole operation if interview creation fails
      }
    }

    return { success: true, candidateId };
  } catch (error: any) {
    console.error("Error inserting candidate to ATS:", error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Submit a job application
 * - Saves candidate to ATS database
 * - Sends email to HR
 */
export const submitApplication = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      experience,
      education,
      coverLetter,
      source,
      vacancyId, // Optional: ID of the vacancy being applied for
    } = req.body;

    console.log("Received application submission:", {
      firstName,
      lastName,
      email,
      position,
      vacancyId,
    });

    // Validate request data
    const { error: validationError } = applicationSchema.validate(req.body);
    if (validationError) {
      console.error("Validation error:", validationError.details[0].message);
      return res.status(400).json({
        message: "Invalid application data",
        error: validationError.details[0].message,
      });
    }

    // Generate secure application reference ID
    const applicationId = `RMJOB-${uuidv4().substring(0, 8).toUpperCase()}`;

    // Cast req to include multer's file property
    const multerReq = req as Request & { file?: Express.Multer.File };

    // Prepare application data for email
    const applicationData: JobApplicationData = {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      experience,
      education,
      resumeUrl: undefined, // No file storage for now
      coverLetter,
      source,
      applicationId,
    };

    // Store in memory for backup/tracking
    applicationSubmissionsStore.push(applicationData);
    console.log(
      `Application stored in memory - Total applications: ${applicationSubmissionsStore.length}`,
    );

    // Insert candidate into ATS database (async, don't block response)
    const insertToATS = async () => {
      try {
        const result = await insertCandidateToATS({
          firstName,
          lastName,
          email,
          phone,
          position,
          department,
          experience,
          education,
          coverLetter,
          source: source || "Koove Organic Career Page",
          vacancyId: vacancyId ? parseInt(vacancyId, 10) : undefined,
        });

        if (result.success) {
          console.log(
            `✅ Application synced to ATS - Candidate ID: ${result.candidateId}`,
          );
        } else {
          console.warn(`⚠️ Failed to sync application to ATS: ${result.error}`);
        }
      } catch (atsError) {
        const errorMessage =
          atsError instanceof Error ? atsError.message : "Unknown ATS error";
        console.error("Error syncing to ATS:", errorMessage);
      }
    };

    // Send emails asynchronously without blocking the response
    const sendEmailsAsync = async () => {
      try {
        await sendJobApplicationEmail(applicationData, multerReq.file);
        console.log(
          `Application email sent to HR for ${firstName} ${lastName}`,
        );
      } catch (emailError) {
        const errorMessage =
          emailError instanceof Error
            ? emailError.message
            : "Unknown email error";
        console.error("Error sending application email to HR:", errorMessage);
      }
    };

    // Start background processes
    Promise.all([insertToATS(), sendEmailsAsync()]).catch((error) => {
      console.error(
        `Background processing failed for application ${applicationId}:`,
        error,
      );
    });

    // Return immediate success response without waiting
    return res.status(201).json({
      message: "Application submitted successfully",
      applicationId: applicationId,
      note: "Your application has been received and is being processed. You will receive a confirmation email shortly.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in submitApplication controller:", error);

    // Ensure we always return valid JSON
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return res.status(500).json({
      message: "An unexpected error occurred",
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
};
