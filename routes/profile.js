var express = require('express');
const profileController = require("../controllers/profileController");
var router = express.Router();

/* GET profile page. */
router.get('/', profileController.profile);

/* GET readed books data */
router.get('/readed-books/', profileController.get_readed_books);

module.exports = router;
