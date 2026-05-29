import { Request, Response } from "express";
import Joi from "joi";
import fetch from "node-fetch";
import dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

const CMS_API_TOKEN = process.env.CMS_API_TOKEN;
const CMS_FETCH_TIMEOUT_MS = 3000;

function normalizeCmsApiUrl(rawUrl?: string) {
  const base = (rawUrl || "https://rdlindogreen.com/strapi").trim();
  if (!base) return "";
  return base.replace(/^https:\/\/www\./i, "https://").replace(/\/$/, "");
}

/**
 * Helper to extract media URL from various Strapi response shapes (flat, nested, array)
 */
const extractMediaUrl = (media: any, baseUrl: string): string | null => {
  if (!media) return null;

  // Handle Strapi v4/v5 nested data structure
  const rawData = media.data !== undefined ? media.data : media;
  
  // Handle case where media is an array
  const item = Array.isArray(rawData) ? rawData[0] : rawData;
  
  // Handle nested attributes inside the item
  const finalObj = item?.attributes ? item.attributes : item;

  if (!finalObj || !finalObj.url) return null;
  
  return finalObj.url.startsWith("http")
    ? finalObj.url
    : `${baseUrl}${finalObj.url}`;
};

function buildAuthHeaderVariants(token: string) {
  const trimmed = token.trim();
  if (!trimmed) return [];
  if (/^Bearer\s+/i.test(trimmed)) {
    return [trimmed];
  }
  return [`Bearer ${trimmed}`, trimmed];
}

// Validation schema for news data
const newsSchema = Joi.object({
  Heading: Joi.string().required().trim().max(200),
  Date: Joi.string().required().trim(),
  Category: Joi.string().required().trim().max(100),
  Description: Joi.string().required().trim().max(500),
  Content: Joi.string().required().trim(),
  // Note: image validation is handled separately
});

// Validation schema for CSR data
const csrSchema = Joi.object({
  Title: Joi.string().required().trim().max(200),
  description: Joi.string().required().trim().max(500),
  // Note: image validation is handled separately
});

/**
 * Get all news from the CMS
 */
export const getNews = async (req: Request, res: Response) => {
  try {
    const apiUrl = normalizeCmsApiUrl(process.env.CMS_API_URL);
    const cmsApiToken = process.env.CMS_API_TOKEN;
    const newsApiId =
      process.env.CMS_NEWS_PANEL_API_ID || "news-and-updates-panel";

    if (!apiUrl) {
      console.error("CMS API URL is not configured");
      return res
        .status(200)
        .json(getFallbackNewsData("CMS API URL not configured"));
    }

    if (!cmsApiToken) {
      console.error("CMS API token is not configured");
      return res
        .status(200)
        .json(getFallbackNewsData("CMS API token not configured"));
    }

    try {
      const fullUrl = `${apiUrl}/api/${newsApiId}?populate=*`;
      const authVariants = buildAuthHeaderVariants(cmsApiToken);

      let result: any = null;
      let lastError = "Unknown CMS fetch error";

      for (const authHeader of authVariants) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), CMS_FETCH_TIMEOUT_MS);

        try {
          const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: authHeader,
            },
            signal: controller.signal,
          });

          const contentType = response.headers.get("content-type") || "";
          const bodyText = await response.text();
          const looksLikeHtml = bodyText.trim().startsWith("<!DOCTYPE") || bodyText.trim().startsWith("<html");

          if (!response.ok) {
            lastError = `API error: ${response.status} ${response.statusText}`;
            continue;
          }

          if (!contentType.includes("application/json") || looksLikeHtml) {
            lastError = `Non-JSON response from CMS (${contentType || "unknown content-type"})`;
            continue;
          }

          try {
            result = JSON.parse(bodyText);
            break;
          } catch {
            lastError = "Invalid JSON payload from CMS";
          }
        } catch (fetchError: any) {
          if (fetchError?.name === "AbortError") {
            lastError = `CMS request timeout after ${CMS_FETCH_TIMEOUT_MS}ms`;
          } else {
            lastError = fetchError?.message || "Fetch error";
          }
        } finally {
          clearTimeout(timeout);
        }
      }

      if (!result) {
        console.error(`Failed to fetch news from CMS: ${lastError}`);
        return res.status(200).json(getFallbackNewsData(lastError));
      }

      // Process data to match the expected format
      if (!result.data || !Array.isArray(result.data)) {
        console.error(
          "Unexpected response format:",
          JSON.stringify(result).substring(0, 200),
        );
        return res
          .status(200)
          .json(getFallbackNewsData("Unexpected API response format"));
      }

      const processedData = result.data.map((rawItem: any) => {
        // Support both Strapi v4 nested attributes and flat formats
        const item = rawItem.attributes 
          ? { id: rawItem.id, ...rawItem.attributes } 
          : rawItem;

        // Use the normalized API URL as the base for assets
        const publicCmsUrl = apiUrl;

        return {
          id: item.id,
          title: item.Heading || item.title || "Untitled",
          date: item.Date || item.publishedAt || new Date().toISOString(),
          category: item.Category || "General",
          excerpt: item.Excerpt || item.Description || "",
          content: item.Content || "",
          image: extractMediaUrl(item.Media || item.image, publicCmsUrl),
          documentUrl: extractMediaUrl(item.DOCUMENT || item.document, publicCmsUrl),
          externalUrl: item.ExternalUrl || item.externalUrl || item.linkUrl || null,
        };
      });

      return res.status(200).json(processedData);
    } catch (fetchError: any) {
      console.error("Fetch error details:", fetchError);
      let errorReason = "Unknown error";
      if (fetchError.code === "ENOTFOUND") {
        errorReason = "CMS server not found";
      } else if (fetchError.code === "ECONNREFUSED") {
        errorReason = "Connection refused";
      } else {
        errorReason = fetchError.message || "Fetch error";
      }

      // Return fallback data instead of throwing
      return res.status(200).json(getFallbackNewsData(errorReason));
    }
  } catch (error) {
    console.error("Error fetching news:", error);

    // Return fallback data in case of API errors
    return res.status(200).json(getFallbackNewsData("General error"));
  }
};

// Helper function to get fallback news data with reason
function getFallbackNewsData(reason: string = "CMS unavailable") {
  // Minimal logging for fallback usage
  console.log(`Using fallback news data. Reason: ${reason}`);

  return [
    {
      id: 1,
      title: "Rashmi Group Achieves Record Production Targets",
      date: "2023-05-15",
      category: "Achievement",
      excerpt:
        "Rashmi Group has achieved record-breaking production targets in the first quarter of 2023, surpassing industry standards.",
      content:
        "Rashmi Group has achieved record-breaking production targets in the first quarter of 2023, surpassing industry standards. This achievement highlights our commitment to excellence and efficient operations.",
      image:
        "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Rashmi Metaliks Launches New Sustainability Initiative",
      date: "2023-04-10",
      category: "Sustainability",
      excerpt:
        "Our new sustainability program aims to reduce carbon emissions by 30% over the next five years.",
      content:
        "Rashmi Metaliks is proud to announce our ambitious new sustainability initiative that aims to reduce carbon emissions by 30% over the next five years, reinforcing our commitment to environmentally responsible manufacturing.",
      image:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];
}

/**
 * Create a new news article in the CMS
 * Requires authentication
 */
export const createNews = async (req: Request, res: Response) => {
  try {
    // Get configuration from environment
    const apiUrl = (
      process.env.CMS_API_URL || "https://kooveorganic.com/strapi"
    ).replace(/\/$/, "");
    const cmsApiToken = process.env.CMS_API_TOKEN;
    const newsPanelApiId =
      process.env.CMS_NEWS_PANEL_API_ID || "news-and-updates-panel";

    if (!apiUrl) {
      console.error("CMS API URL is not configured");
      return res.status(500).json({ message: "CMS API URL not configured" });
    }

    if (!cmsApiToken) {
      console.error("CMS API token is not configured");
      return res.status(500).json({ message: "CMS API token not configured" });
    }

    // Validate the request data
    const { error: validationError } = newsSchema.validate(req.body);
    if (validationError) {
      return res.status(400).json({
        message: "Invalid news data",
        error: validationError.details[0].message,
      });
    }

    // Handle image upload if provided
    let imageId = null;
    if (req.file) {
      const formData = new FormData();
      formData.append("files", req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });

      const uploadResponse = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        headers: {
          // Use correct token format without Bearer prefix
          Authorization: cmsApiToken,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        return res.status(500).json({ message: "Failed to upload image" });
      }

      const uploadResult = (await uploadResponse.json()) as any;
      imageId = uploadResult[0]?.id;
    }

    // Prepare the data for Strapi API
    const strapiData = {
      data: {
        Heading: req.body.Heading,
        Date: req.body.Date,
        Category: req.body.Category,
        Excerpt: req.body.Excerpt || req.body.Description,
        Content: req.body.Content,
        ...(imageId && { Media: imageId }),
      },
    };

    // Create the news article
    const createResponse = await fetch(`${apiUrl}/api/${newsPanelApiId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Use correct token format without Bearer prefix
        Authorization: cmsApiToken,
      },
      body: JSON.stringify(strapiData),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      return res.status(500).json({
        message: "Failed to create news article",
        error: errorText,
      });
    }

    const result = await createResponse.json();
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error creating news:", error);
    return res.status(500).json({
      message: "Failed to create news article",
      error: (error as Error).message,
    });
  }
};

/**
 * Update an existing news article in the CMS
 * Requires authentication
 */
export const updateNews = async (req: Request, res: Response) => {
  try {
    // Get configuration from environment
    const apiUrl = (
      process.env.CMS_API_URL || "https://kooveorganic.com/strapi"
    ).replace(/\/$/, "");
    const cmsApiToken = process.env.CMS_API_TOKEN;
    const newsPanelApiId =
      process.env.CMS_NEWS_PANEL_API_ID || "news-and-updates-panel";

    if (!apiUrl) {
      console.error("CMS API URL is not configured");
      return res.status(500).json({ message: "CMS API URL not configured" });
    }

    if (!cmsApiToken) {
      console.error("CMS API token is not configured");
      return res.status(500).json({ message: "CMS API token not configured" });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "News ID is required" });
    }

    // Validate the request data
    const { error: validationError } = newsSchema.validate(req.body);
    if (validationError) {
      return res.status(400).json({
        message: "Invalid news data",
        error: validationError.details[0].message,
      });
    }

    // Handle image upload if provided
    let imageId = null;
    if (req.file) {
      const formData = new FormData();
      formData.append("files", req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });

      const uploadResponse = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        headers: {
          // Use correct token format without Bearer prefix
          Authorization: cmsApiToken,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        return res.status(500).json({ message: "Failed to upload image" });
      }

      const uploadResult = (await uploadResponse.json()) as any;
      imageId = uploadResult[0]?.id;
    }

    // Prepare the data for Strapi API
    const strapiData = {
      data: {
        Heading: req.body.Heading,
        Date: req.body.Date,
        Category: req.body.Category,
        Excerpt: req.body.Excerpt || req.body.Description,
        Content: req.body.Content,
        ...(imageId && { Media: imageId }),
      },
    };

    // Update the news article
    const updateResponse = await fetch(
      `${apiUrl}/api/${newsPanelApiId}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Use correct token format without Bearer prefix
          Authorization: cmsApiToken,
        },
        body: JSON.stringify(strapiData),
      },
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      return res.status(500).json({
        message: "Failed to update news article",
        error: errorText,
      });
    }

    const result = await updateResponse.json();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error updating news:", error);
    return res.status(500).json({
      message: "Failed to update news article",
      error: (error as Error).message,
    });
  }
};

/**
 * Update an existing CSR item in the CMS
 * Requires authentication
 */
export const updateCSR = async (req: Request, res: Response) => {
  try {
    // Get configuration from environment
    const apiUrl = (
      process.env.CMS_API_URL || "https://kooveorganic.com/strapi"
    ).replace(/\/$/, "");
    const cmsApiToken = process.env.CMS_API_TOKEN;

    if (!apiUrl) {
      console.error("CMS API URL is not configured");
      return res.status(500).json({ message: "CMS API URL not configured" });
    }

    if (!cmsApiToken) {
      console.error("CMS API token is not configured");
      return res.status(500).json({ message: "CMS API token not configured" });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "CSR ID is required" });
    }

    // Validate the request data
    const { error: validationError } = csrSchema.validate(req.body);
    if (validationError) {
      return res.status(400).json({
        message: "Invalid CSR data",
        error: validationError.details[0].message,
      });
    }

    // Handle image upload if provided
    let imageId = null;
    if (req.file) {
      const formData = new FormData();
      formData.append("files", req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });

      const uploadResponse = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: cmsApiToken,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        return res.status(500).json({ message: "Failed to upload image" });
      }

      const uploadResult = (await uploadResponse.json()) as any;
      imageId = uploadResult[0]?.id;
    }

    // Prepare the data for Strapi API
    const strapiData = {
      data: {
        Title: req.body.Title,
        description: req.body.description,
        ...(imageId && { Media: imageId }),
      },
    };

    // Make PUT request to Strapi to update CSR
    const updateResponse = await fetch(`${apiUrl}/api/csrs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: cmsApiToken,
      },
      body: JSON.stringify(strapiData),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      return res.status(500).json({
        message: "Failed to update CSR item",
        error: errorText,
      });
    }

    const result = await updateResponse.json();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error updating CSR:", error);
    return res.status(500).json({
      message: "Failed to update CSR item",
      error: (error as Error).message,
    });
  }
};
