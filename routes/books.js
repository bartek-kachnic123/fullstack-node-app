var express = require('express');
const booksController = require('../controllers/booksController')
var router = express.Router();

/* GET search page. */
router.get('/search/', booksController.search);
router.put('/search/', booksController.search_update_book);
router.get('/data/', booksController.search_books);

/* GET add-book page. */
router.get('/add/', booksController.add_book);
router.post('/add/', booksController.add_book_to_database);

/* GET book-details page. */
router.get('/b/:id/', booksController.book_details);
router.put('/b/:id/', booksController.book_details_update);
router.delete('/b/:id/', booksController.delete_book);

/* GET genres data  */
router.get('/genres/', booksController.get_genres);


module.exports = router;
