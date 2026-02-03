const Feedback = require('../models/Feedback');
const AppError = require('../utils/AppError');

exports.createFeedback = async (req, res, next) => {
    try {
        const { category, message } = req.body;

        if (!message) {
            return next(new AppError('Please provide a message.', 400));
        }

        const feedback = await Feedback.create({
            user: req.user.id,
            category,
            message
        });

        res.status(201).json({
            status: 'success',
            data: {
                feedback
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.getAllFeedback = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find()
            .populate('user', 'name email phone')
            .sort('-createdAt');

        res.status(200).json({
            status: 'success',
            results: feedbacks.length,
            data: {
                feedbacks
            }
        });
    } catch (err) {
        next(err);
    }
};
