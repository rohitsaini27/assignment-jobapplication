const express = require("express");
const {
  getRecommendations,
} = require("../controllers/recommendation.controller");

const router = express.Router();

router.get("/:candidateId/recommendations", getRecommendations);

module.exports = router;