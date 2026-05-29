import express from "express";
import {
  getNews,
  createNews,
  updateNews,
  updateCSR,
} from "../controllers/cmsController";
import { authMiddleware } from "../middleware/auth";
import fetch from "node-fetch";

const router = express.Router();

// GET /api/news - Get all news (public)
router.get("/", getNews);

// GET /api/news/debug - Get raw Strapi news data for debugging
router.get("/debug", async (req, res) => {
  try {
    // Get configuration from environment
    const apiUrl = (
      process.env.CMS_API_URL || "https://kooveorganic.com/strapi"
    ).replace(/\/$/, "");
    const cmsApiToken = process.env.CMS_API_TOKEN;
    const newsApiId =
      process.env.CMS_NEWS_PANEL_API_ID || "news-and-updates-panel";

    // Make the request to Strapi
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Only add Authorization header if token exists
    if (cmsApiToken) {
      headers["Authorization"] = cmsApiToken;
    }

    const response = await fetch(`${apiUrl}/api/${newsApiId}?populate=*`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Error fetching from Strapi: ${error}`);
      return res.status(response.status).json({ error });
    }

    // Get raw JSON data
    const rawData = await response.json();

    // Return the raw response
    return res.status(200).json(rawData);
  } catch (error) {
    console.error("Debug endpoint error:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/news - Create a news article (authenticated)
router.post("/", authMiddleware, createNews);

// PUT /api/news-and-updates-panel/:id - Update a news article (authenticated)
router.put("/news-and-updates-panel/:id", authMiddleware, updateNews);

// PUT /api/csrs/:id - Update a CSR item (authenticated)
router.put("/csrs/:id", authMiddleware, updateCSR);

export { router as cmsRoutes };
