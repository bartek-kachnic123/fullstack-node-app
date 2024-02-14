const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        ref: "Genre",
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    pageCount: Number,
});

module.exports = mongoose.model('Book', bookSchema);