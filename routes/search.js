var express = require('express');
var router = express.Router();

/* GET search page. */
router.get('/', function(req, res, next) {
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

module.exports = router;
