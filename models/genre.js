const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    colorHex: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Genre', genreSchema);