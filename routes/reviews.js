const express    = require('express');
const router     = express.Router();
const rateLimit  = require('express-rate-limit');
const { Review } = require('../models');

// Rate limit — 1 review per 10 min per IP
const reviewLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1,
  message: { error: 'Too many requests. Please wait 10 minutes.' }
});

// ── GET approved reviews ─────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { approved: true },
      attributes: ['id', 'name', 'service', 'rating', 'review_text', 'created_at'],
      order: [['id', 'DESC']],
      limit: 20,
      raw: true,
    });

    // Map field names for frontend compatibility
    const mappedReviews = reviews.map(r => ({
      id: r.id,
      name: r.name,
      service: r.service,
      rating: r.rating,
      text: r.review_text,
      createdAt: r.created_at || new Date().toISOString(),
    }));

    const total = reviews.length;
    const avg   = total > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
      : 0;

    console.log('Responding with reviews:', { count: total, avg, reviews: mappedReviews });
    res.json({ success: true, reviews: mappedReviews, avg, total });
  } catch (err) {
    console.error('Reviews GET error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// ── POST new review ──────────────────────────────────────
router.post('/', reviewLimiter, async (req, res) => {
  try {
    const { name, service, rating, text } = req.body;

    console.log('Received review data:', { name, service, rating, text });

    if (!name || !text || !rating) {
      return res.status(400).json({ success: false, error: 'Name, rating, and review are required.' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, error: 'Rating must be between 1 and 5.' });
    }

    const review = await Review.create({
      name: name.trim(),
      service: service?.trim() || null,
      rating: parseInt(rating),
      reviewText: text.trim(),
      approved: false,
    });

    console.log('Review created:', review.id);
    res.json({ success: true, message: 'Review submitted! Pending approval.', reviewId: review.id });
  } catch (err) {
    console.error('Review POST error:', err);
    res.status(500).json({ success: false, error: 'Could not save review.', details: err.message });
  }
});

// ── PATCH approve review (admin only) ───────────────────
router.patch('/:id/approve', async (req, res) => {
  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    await review.update({ approved: true });

    res.json({ success: true, message: 'Review approved.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not approve review.' });
  }
});

// ── GET pending reviews (admin only) ────────────────────
router.get('/pending', async (req, res) => {
  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const reviews = await Review.findAll({
      where: { approved: false },
      order: [['createdAt', 'DESC']],
      raw: true,
    });
    res.json({ success: true, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── DELETE review (admin only) ───────────────────────────
router.delete('/:id', async (req, res) => {
  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    await review.destroy();

    res.json({ success: true, message: 'Review deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not delete review.' });
  }
});

module.exports = router;