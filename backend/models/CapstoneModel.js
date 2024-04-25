const mongoose = require('mongoose');

const capstoneSchema = new mongoose.Schema(
    {
        uploader: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: false
        },
        image: {
            type: String,
            required: true
        },
        PDFurl: {
            type: String,
            required: true
        },
        yearCreated: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Capstone', capstoneSchema);