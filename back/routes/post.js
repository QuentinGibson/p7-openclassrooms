const express = require("express");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const {
  getRecentPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");

const router = express.Router();

router.get("/:id", auth, getPostById);
router.get("/", auth, getRecentPosts);
router.post("/", auth, multer, createPost);
router.put("/:id", auth, multer, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
