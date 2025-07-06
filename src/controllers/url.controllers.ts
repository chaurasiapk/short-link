import { Request, Response } from "express";
import shortid from "shortid";

import Url from "../models/url.model";

/**
 * @route   POST /shorten
 * @desc    Create a shortened URL from the original URL
 * @access  Public
 */
const createShortUrl = async (req: Request, res: Response): Promise<void | any> => {
  const { originalUrl } = req.body;

  // Validate input: original URL is required
  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  try {
    // Generate a unique short code
    const shortCode = shortid.generate();

    // Create a new URL entry and save to the database
    const url = new Url({ originalUrl, shortCode });
    await url.save();

    // Construct the shortened URL using protocol, host, and short code
    const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

    // Return the shortened URL in the response
    res.json({ shortUrl });
  } catch (err) {
    console.error("Error creating short URL:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * @route   GET /:shortCode
 * @desc    Redirect to the original URL based on short code
 * @access  Public
 */
const redirectToLongUrl = async (req: Request, res: Response): Promise<void | any> => {
  const { shortCode } = req.params;

  try {
    // Look up the short code in the database
    const url = await Url.findOne({ shortCode });

    // If no URL found, return 404
    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Optional: Track the number of clicks
    url.clicks += 1;
    await url.save();

    // Redirect to the original long URL
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error("Error redirecting:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * @route   DELETE /remove/:shortCode
 * @desc    Delete a shortened URL entry
 * @access  Public
 */
const deleteShortUrl = async (req: Request, res: Response): Promise<void | any> => {
  const { shortCode } = req.params;

  try {
    // Find and delete the URL entry with the given short code
    const deleted = await Url.findOneAndDelete({ shortCode });

    // If not found, return 404
    if (!deleted) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Return success response
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting URL:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Export controller functions
export {
  createShortUrl,
  redirectToLongUrl,
  deleteShortUrl
};
