const express = require('express');
const categoryController = require('../../controllers/categoryController');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', categoryController.getAllCategories);

// Protected routes (Admin only)
router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('ADMIN'));

router.post('/', categoryController.createCategory);
router
    .route('/:id')
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

module.exports = router;
