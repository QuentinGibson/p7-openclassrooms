const express = require("express");
const auth = require("../middleware/auth");
const { deleteUser, updateUser, getUser } = require("../controllers/user");

const router = express.Router();

router.get("/:id", auth, getUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
