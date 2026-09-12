const {
  calculateSkillScore,
  calculateExperienceScore,
  calculateLocationScore,
  calculateSalaryScore,
} = require("../src/services/recommendation.service");

describe("Recommendation scoring", () => {
  test("calculates skill score based on matched skills", () => {
    const job = {
      requiredSkills: [
        { name: "Node.js", type: "must-have" },
        { name: "MongoDB", type: "must-have" },
        { name: "Redis", type: "nice-to-have" },
        { name: "React", type: "nice-to-have" },
      ],
    };

    const candidate = {
      skills: ["Node.js", "MongoDB"],
    };

    expect(calculateSkillScore(job, candidate)).toBe(25);
  });

  test("gives full experience score when candidate meets requirement", () => {
    const job = {
      minYearsExperience: 2,
    };

    const candidate = {
      yearsOfExperience: 3,
    };

    expect(calculateExperienceScore(job, candidate)).toBe(20);
  });

  test("penalizes candidate when experience is below requirement", () => {
    const job = {
      minYearsExperience: 4,
    };

    const candidate = {
      yearsOfExperience: 2,
    };

    expect(calculateExperienceScore(job, candidate)).toBe(10);
  });

  test("gives full location score for exact location match", () => {
    const job = {
      location: "Noida",
      remoteAllowed: false,
    };

    const candidate = {
      location: "Noida",
    };

    expect(calculateLocationScore(job, candidate)).toBe(15);
  });

  test("gives remote score when location does not match but remote is allowed", () => {
    const job = {
      location: "Bangalore",
      remoteAllowed: true,
    };

    const candidate = {
      location: "Noida",
    };

    expect(calculateLocationScore(job, candidate)).toBe(10);
  });

  test("gives zero salary score when job cannot meet expected salary", () => {
    const job = {
      salaryRange: {
        min: 800000,
        max: 900000,
      },
    };

    const candidate = {
      expectedSalary: 1000000,
    };

    expect(calculateSalaryScore(job, candidate)).toBe(0);
  });

  test("calculates salary score when expected salary falls within job range", () => {
    const job = {
      salaryRange: {
        min: 900000,
        max: 1300000,
      },
    };

    const candidate = {
      expectedSalary: 1000000,
    };

    expect(calculateSalaryScore(job, candidate)).toBe(13.75);
  });
});