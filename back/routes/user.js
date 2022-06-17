const express = require("express");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const { deleteUser, updateUser, getUser } = require("../controllers/user");

const router = express.Router();

router.get("/:id", auth, getUser);
router.put("/:id", auth, multer, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
