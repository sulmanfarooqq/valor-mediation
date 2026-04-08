const express = require('express');
const router = express.Router();
const homeController = require('../controllers/web/homeController');
const pageController = require('../controllers/web/pageController');
const blogController = require('../controllers/web/blogController');
const contactController = require('../controllers/web/contactController');
const { contactLimiter } = require('../middleware/rateLimiter');

// Home
router.get('/', homeController.getHome);

// Static pages
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us', user: req.user });
});

router.get('/why-mediation', (req, res) => {
  res.render('why-mediation', { title: 'Why Mediation', user: req.user });
});

// Services overview
router.get('/services', (req, res) => {
  res.render('services', { title: 'Our Services', user: req.user });
});

// Services individual pages
router.get('/services/business-mediation', (req, res) => {
  res.render('services/business-mediation', { title: 'Business Mediation', user: req.user });
});
router.get('/services/family-mediation', (req, res) => {
  res.render('services/family-mediation', { title: 'Family Mediation', user: req.user });
});
router.get('/services/workplace-mediation', (req, res) => {
  res.render('services/workplace-mediation', { title: 'Workplace Mediation', user: req.user });
});
router.get('/services/legal-mediation', (req, res) => {
  res.render('services/legal-mediation', { title: 'Legal Mediation', user: req.user });
});
router.get('/services/real-estate-mediation', (req, res) => {
  res.render('services/real-estate-mediation', { title: 'Real Estate Mediation', user: req.user });
});
router.get('/services/personal-injury-mediation', (req, res) => {
  res.render('services/personal-injury-mediation', { title: 'Personal Injury Mediation', user: req.user });
});

// Locations overview
router.get('/locations', (req, res) => {
  res.render('locations/index', { title: 'Our Locations', user: req.user });
});

// Locations individual pages
const locations = ['dallas', 'fort-worth', 'plano', 'irving', 'arlington', 'frisco', 'grand-prairie', 'denton', 'garland'];
locations.forEach(loc => {
  router.get(`/locations/${loc}`, (req, res) => {
    res.render(`locations/${loc}`, { title: `${loc.replace('-', ' ')} Mediation`, user: req.user });
  });
});

// Contact
router.get('/contact', contactController.getContact);
router.post('/contact/consultation', contactLimiter, contactController.postConsultation);
router.post('/contact/question', contactLimiter, contactController.postQuestion);

// Blog
router.get('/blog', blogController.getBlogIndex);
router.get('/blog/:slug', blogController.getBlogPost);

// Dynamic pages (if using Page model)
router.get('/:slug', pageController.getPage);

module.exports = router;