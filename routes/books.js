var express = require('express');
const Book = require('../models/book');
const Genre = require('../models/genre');
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
    const genre = new Genre( {
        _id: req.body.genre,
        colorHex: getRandomColor()
    });

    if (Genre.exists({_id: req.body.genre}) === null) {
        console.log(genre);
        genre.save()
            .then(result => console.log("Added genre to database"))
            .catch(err => console.log(err));
    }

    const book = new Book( {
        title: req.body.title,
        author: req.body.author,
        publishedDate: req.body.publishedDate,
        genre: req.body.genre
    });
    book.save()
        .then(result => console.log("Added book to database"))
        .catch(err => console.log(err));

    res.render('add-book', { title: 'Dodaj' });
})


const getRandomColor = () => {
    const randomNumber =  (x) => (Math.floor(Math.random() * x) * 20).toString(16).padStart(2, '0');
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    const shuffled_arr = shuffle([randomNumber(10), randomNumber(11), randomNumber(12)])
    return`#${shuffled_arr[0]}${shuffled_arr[1]}${shuffled_arr[2]}`;
}
module.exports = router;
