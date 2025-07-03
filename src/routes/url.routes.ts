import express, { Request, Response } from "express";
import shortid from "shortid";
import Url from "../models/url.model";

const router = express.Router();

/**
 * POST /shorten
 * Create a shortened URL from the original URL
 */
const createShortUrl = async (req: Request, res: Response): Promise<void | any> => {
  const { originalUrl } = req.body;

  // Validate input
  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  try {
    // Generate a unique short code
    const shortCode = shortid.generate();

    // Save to database
    const url = new Url({ originalUrl, shortCode });
    await url.save();

    // Respond with the full shortened URL
    const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
    res.json({ shortUrl });
  } catch (err) {
    console.error("Error creating short URL:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * GET /:shortCode
 * Redirect user to the original URL using the short code
 */
const redirectToLongUrl = async (req: Request, res: Response): Promise<void | any> => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Optional: Track clicks
    url.clicks += 1;
    await url.save();

    // Redirect to the original URL
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error("Error redirecting:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * DELETE /remove/:shortCode
 * Delete a short URL entry from the database
 */
const deleteShortUrl = async (req: Request, res: Response): Promise<void | any> => {
  const { shortCode } = req.params;

  try {
    const deleted = await Url.findOneAndDelete({ shortCode });

    if (!deleted) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting URL:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * GET /
 * Render the home page with no short URL initially
 */
router.get("/", (_req, res) => {
  res.render("index", { shortUrl: null });
});

// Define routes
router.post("/shorten", createShortUrl);
router.get("/:shortCode", redirectToLongUrl);
router.delete("/remove/:shortCode", deleteShortUrl);

export default router;
