const express = require("express");
const candidateRoutes = require("./routers/candidate.router");
const jobRoutes = require("./routers/job.router");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Job Recommendation API is running",
  });
});

app.use("/api/candidates", candidateRoutes);
app.use("/api/jobs", jobRoutes);


module.exports = app;