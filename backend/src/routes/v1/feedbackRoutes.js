const express = require('express');
const feedbackController = require('../../controllers/feedbackController');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

router.post('/', feedbackController.createFeedback);

// Restrict to Admin for viewing
router.get('/', authMiddleware.restrictTo('ADMIN'), feedbackController.getAllFeedback);

module.exports = router;
