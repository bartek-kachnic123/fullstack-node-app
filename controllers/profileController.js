const Book = require("../models/book");
const profile = (req, res, next) => {
    res.render('profile', { title: 'Profil' });
}

const get_readed_books = (req, res, next) => {
    Book.aggregate([{
        $match: {
            is_readed: true
        }
    },
        {

            $lookup: {
                from: 'genres',
                localField: 'genre',
                foreignField: '_id',
                as: 'genre_details'
            }
        },
        {
            $unwind: '$genre_details'
        }

    ])
        .then(result => {
            const readedBooksNumber = result.length;
            const data = {};
            result.forEach(elem => {
                if (data[elem.genre]) {
                    data[elem.genre].books.push([elem._id, elem.title]);
                }
                else {
                    data[elem.genre] = {
                        books: [[elem._id, elem.title]],
                        colorHex: elem.genre_details.colorHex
                    }
                }
            })
            res.json({data: data, readedBooksNumber: readedBooksNumber});
        }).catch(err => console.log(err));

}


module.exports = {
    profile,
    get_readed_books,
}