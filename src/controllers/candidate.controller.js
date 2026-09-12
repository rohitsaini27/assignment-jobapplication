const candidateService = require("../services/candidate.service");
const createCandidate = async (req, res) => {
  try {
    const candidate = await candidateService.createCandidate(req.body);

    return res.status(201).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCandidate,
};