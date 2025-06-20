const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");


const {
  addAffirmation,
  getAffirmations,
  deleteAffirmation,
} = require("../controllers/affirmationController");

router.post("/", protect, addAffirmation);
router.get("/", protect, getAffirmations);
router.delete("/:id", protect, deleteAffirmation);

module.exports = router;
