const Candidate = require("../models/condidate.model");

const createCandidate = async (candidateData) => {
  const candidate = await Candidate.create(candidateData);

  return candidate;
};

module.exports = {
  createCandidate,
};