const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A category must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A category name must have less or equal then 40 characters']
    },
    id: {
        type: String,
        unique: true
    },
    slug: String,
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1581578731117-1045293d2f28?q=80&w=400'
    },
    color: {
        type: String,
        default: 'bg-blue-50 text-blue-600' // Default tailwind classes for frontend
    },
    description: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Document middleware: runs before .save() and .create()
categorySchema.pre('save', async function () {
    if (this.name) {
        this.slug = this.name.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');

        if (!this.id) {
            this.id = this.slug;
        }
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
