// routes/notesRoutes.js
const express = require("express");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getNotes);
router.put("/", authMiddleware, updateNote);
router.delete("/", authMiddleware, deleteNote);

module.exports = router;
