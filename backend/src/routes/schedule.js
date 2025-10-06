const express = require('express');
const { generateOptimalSchedule } = require('../services/schedulingService');
const router = express.Router();

// POST /api/schedule/optimize
// body: { sessions: [{ id, title, start, end, score? }, ...] }
router.post('/optimize', (req, res) => {
  try {
    const sessions = req.body.sessions || [];
    const optimized = generateOptimalSchedule(sessions);
    res.json({ optimized });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
