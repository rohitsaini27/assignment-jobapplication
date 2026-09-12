# Job Recommendation Engine

A rule-based Job Match API that recommends jobs to candidates based on skills, experience, location, and salary fit.

The recommendation engine uses transparent scoring rules rather than machine learning, making every recommendation explainable.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Jest

## Features

- Create candidate profiles
- Create job postings
- Generate job recommendations for a candidate
- Hard filtering for missing must-have skills
- Score nice-to-have skills
- Experience-based scoring
- Location-based scoring
- Salary-fit scoring
- Overall match score from 0–100
- Score breakdown for every recommendation
- Support for top-N recommendations using the `limit` query parameter

## Project Structure

```text
job-recommendation-api/
│
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── models/
│   ├── config/
│   └── app.js
│
├── tests/
├── server.js
├── package.json
├── .env
├── .gitignore
└── README.md