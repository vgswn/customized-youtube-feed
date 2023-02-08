const express = require("express");
const { ytFeed } = require("../controllers/ytController");
const router = express.Router();
/**
 * Router for yt-fee get api
 */
router.get("/yt-feed", ytFeed);
module.exports = router;