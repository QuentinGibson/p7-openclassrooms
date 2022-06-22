const express = require("express");
const multer = require("../middleware/multer-config");
const rateLimiter = require("../middleware/rate-limit");
const auth = require("../middleware/auth");
const {
  getRecentPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");

const router = express.Router();

router.get("/:id", getPostById);
router.get("/", getRecentPosts);
router.post("/", auth, multer, rateLimiter, createPost);
router.put("/:id", auth, multer, rateLimiter, updatePost);
router.delete("/:id", auth, rateLimiter, deletePost);

module.exports = router;
