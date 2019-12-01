const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    _id_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 4320000
    }
})
module.exports = mongoose.model('Token', TokenSchema);
