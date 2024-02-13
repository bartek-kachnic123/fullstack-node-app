var express = require('express');
const Book = require('../models/book');
var router = express.Router();

/* GET search page. */
router.get('/search/', function(req, res, next) {
    res.render('search', { title: 'Wyszukiwarka' });
});

router.get('/data/', function(req, res, next) {
    let arr = ['title1', 'title2', 'title3'];
    let filtered_arr = [];
    console.log(req.query.q);
    if (req.query.q.length !== 0) {
        filtered_arr = arr.filter(s => s.includes(req.query.q));
    }
    res.json({data: filtered_arr});
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
