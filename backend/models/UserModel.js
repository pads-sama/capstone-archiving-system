const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    usersname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: [{
        type: String,
        default: 'user'
    }],
    emailVerified: {
        type: Boolean,
        default: false
    },
    reatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);