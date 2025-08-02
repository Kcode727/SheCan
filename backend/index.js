// server/index.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

// Dummy data
const userData = {
  name: 'Alexandra',
  referralCode: 'SHE2025',
  donations: 23,
  points: 750
};

const leaderboard = [
  { name: 'Alexandra', points: 750 },
  { name: 'Jordan', points: 680 },
  { name: 'Sam', points: 620 },
  { name: 'Taylor', points: 590 },
  { name: 'Chris', points: 550 },
];

// Endpoints
app.get('/api/user', (req, res) => {
  res.json(userData);
});

app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
