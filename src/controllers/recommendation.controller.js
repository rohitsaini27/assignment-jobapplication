const recommendationService = require("../services/recommendation.service");

const getRecommendations = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const { limit } = req.query;

    const recommendations =
      await recommendationService.getRecommendations(candidateId, limit);

    return res.status(200).json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRecommendations,
};