const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Feedback must belong to a user.']
    },
    category: {
        type: String,
        enum: ['Improvements', 'New Service', 'Grievance'],
        default: 'Improvements'
    },
    message: {
        type: String,
        required: [true, 'Feedback message cannot be empty.'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
