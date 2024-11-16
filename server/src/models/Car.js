const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        validate: (v) => v.length <= 10
    },
    tags: {
        type: [String],
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
