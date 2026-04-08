const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const authController = require('../controllers/admin/authController');
const dashboardController = require('../controllers/admin/dashboardController');
const blogController = require('../controllers/admin/blogController');
const pageController = require('../controllers/admin/pageController');
const settingsController = require('../controllers/admin/settingsController');
const contactController = require('../controllers/admin/contactController');

// Auth routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);

// Protected routes
router.use(isAuthenticated);
router.use(isAdmin);

router.get('/dashboard', dashboardController.getDashboard);

// Blogs
router.get('/blogs', blogController.getBlogs);
router.get('/blogs/create', blogController.getCreateBlog);
router.post('/blogs/create', blogController.postCreateBlog);
router.get('/blogs/edit/:id', blogController.getEditBlog);
router.post('/blogs/update/:id', blogController.postUpdateBlog);
router.post('/blogs/delete/:id', blogController.postDeleteBlog);

// Pages
router.get('/pages', pageController.getPages);
router.get('/pages/edit/:id', pageController.getEditPage);
router.post('/pages/create', pageController.postCreatePage);
router.post('/pages/update/:id', pageController.postUpdatePage);
router.post('/pages/delete/:id', pageController.postDeletePage);

// Contacts
router.get('/contacts', contactController.getContacts);
router.get('/contacts/view/:id', contactController.getContactDetail);
router.post('/contacts/delete/:id', contactController.postDeleteContact);

// Settings
router.get('/settings', settingsController.getSettings);
router.post('/settings', settingsController.postSettings);

module.exports = router;