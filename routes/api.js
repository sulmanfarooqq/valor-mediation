const express = require('express');
const router = express.Router();
const chatbot = require('../services/chatbot');

router.post('/chatbot', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });
    const reply = await chatbot.getResponse(message);
    res.json({ reply });
  } catch (err) {
    console.error('Chatbot error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;