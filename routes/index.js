const express = require('express');
const router = express.Router();

router.use('/', require('./web'));
router.use('/admin', require('./admin'));
router.use('/api', require('./api'));

module.exports = router;