var express = require('express');
const Book = require('../models/book');
var router = express.Router();

/* GET search page. */
router.get('/search/', function(req, res, next) {
    res.render('search', { title: 'Wyszukiwarka' });
});

router.get('/data/', async function (req, res, next) {
    if (req.query.length === 0) {
        res.json({data: []});
    }
    const regex = `^.*${req.query.q}.*$`
    await Book.find({title: { $regex: req.query.q, $options: "i" }})
        .then(result => {
            res.json({data: result});
        })
        .catch(err => console.log(err));

});

router.get('/add/', function(req, res) {
    res.render('add-book', { title: 'Dodaj' });
});

router.post('/add/', function(req, res) {
    const book = new Book( {
        title: req.body.title,
        author: req.body.author,
        publishedDate: req.body.publishedDate,
        genre: req.body.genre
    });
    book.save()
        .then(result => console.log("Added to database"))
        .catch(err => console.log(err));

    res.render('add-book', { title: 'Dodaj' });
})

module.exports = router;
