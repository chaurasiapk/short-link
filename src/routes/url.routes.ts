import express from "express";
import {
  createShortUrl,
  deleteShortUrl,
  redirectToLongUrl,
} from "../controllers/url.controllers";

const router = express.Router();

/**
 * @route   GET /
 * @desc    Render the home page with an optional shortened URL (initially null)
 * @access  Public
 */
router.get("/", (_req, res) => {
  res.render("index", { shortUrl: null });
});

/**
 * @route   GET /:shortCode
 * @desc    Redirect to the original URL using the provided short code
 * @access  Public
 */
router.get("/:shortCode", redirectToLongUrl);

/**
 * @route   POST /shorten
 * @desc    Create a shortened URL from the original URL
 * @access  Public
 */
router.post("/api/shorten", createShortUrl);

/**
 * @route   DELETE /remove/:shortCode
 * @desc    Delete a shortened URL from the database
 * @access  Public
 */
router.delete("/api/remove/:shortCode", deleteShortUrl);

export default router;

