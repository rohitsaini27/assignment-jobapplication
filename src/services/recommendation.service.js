const Candidate = require("../models/condidate.model");
const Job = require("../models/job.models");

const getRecommendations = async (candidateId, limit) => {
  // 1. Find candidate
  const candidate = await Candidate.findById(candidateId);

  if (!candidate) {
    throw new Error("Candidate not found");
  }

  // 2. Find all jobs
  const jobs = await Job.find();

  if (!jobs || jobs.length === 0) {
    throw new Error("No jobs found");
  }

  // 3. Filter jobs based on must-have skills
  const eligibleJobs = jobs.filter((job) => {
    const mustHaveSkills = job.requiredSkills.filter(
      (skill) => skill.type === "must-have"
    );

    return mustHaveSkills.every((skill) =>
      candidate.skills.includes(skill.name)
    );
  });

  if (eligibleJobs.length === 0) {
    throw new Error("No eligible jobs found for the candidate");
  }

  // 4. Calculate score for each eligible job
  const scoredJobs = eligibleJobs.map((job) => {
    const skillScore = calculateSkillScore(job, candidate);
    const experienceScore = calculateExperienceScore(job, candidate);
    const locationScore = calculateLocationScore(job, candidate);
    const salaryScore = calculateSalaryScore(job, candidate);

    const totalScore =
      skillScore +
      experienceScore +
      locationScore +
      salaryScore;

    return {
      job,
      score: totalScore,
      breakdown: {
        skills: skillScore,
        experience: experienceScore,
        location: locationScore,
        salary: salaryScore,
      },
    };
  });

  // 5. Sort jobs by score descending
  scoredJobs.sort((a, b) => b.score - a.score);

  // 6. Apply limit
  const limitedJobs = limit
    ? scoredJobs.slice(0, Number(limit))
    : scoredJobs;

  // 7. Return recommendations
  return limitedJobs;
};

const calculateSkillScore = (job, candidate) => {
  const totalRequiredSkills = job.requiredSkills.length;

  if (totalRequiredSkills === 0) {
    return 0;
  }

  const matchedSkills = job.requiredSkills.filter((skill) =>
    candidate.skills.includes(skill.name)
  );

  return (matchedSkills.length / totalRequiredSkills) * 50;
};

const calculateExperienceScore = (job, candidate) => {
  const requiredExp = job.minYearsExperience;

  if (requiredExp === 0) {
    return 20;
  }

  if (candidate.yearsOfExperience >= requiredExp) {
    return 20;
  }

  return (candidate.yearsOfExperience / requiredExp) * 20;
};

const calculateLocationScore = (job, candidate) => {
  const jobLocation = job.location.toLowerCase();
  const candidateLocation = candidate.location.toLowerCase();

  if (jobLocation === candidateLocation) {
    return 15;
  }

  if (job.remoteAllowed) {
    return 10;
  }

  return 0;
};

const calculateSalaryScore = (job, candidate) => {
  const expectedSalary = candidate.expectedSalary;

  const { min, max } = job.salaryRange;

  // Job cannot meet candidate's expectation
  if (max < expectedSalary) {
    return 0;
  }

  // Job's minimum salary already meets/exceeds expectation
  if (min >= expectedSalary) {
    return 15;
  }

  // Candidate's expectation falls inside the salary range
  const range = max - min;
  const headroom = max - expectedSalary;

  return 10 + (headroom / range) * 5;
};

module.exports = {
  getRecommendations,
  calculateSkillScore,
  calculateExperienceScore,
  calculateLocationScore,
  calculateSalaryScore,
};