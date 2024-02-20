const ObjectId = require('mongoose').Types.ObjectId
const Book = require("../models/book");
const Genre = require("../models/genre");

const search = (req, res, next) => {
    res.render('search', { title: 'Wyszukiwarka' });
}
const search_books = async (req, res, next) => {
    if (/^\s*$/.test(req.query.q)) {
        res.json({data: []});
    } else {
        Book.aggregate([{
            $match: {
                $expr: {
                    $or: [
                        {
                            $regexMatch: {
                                input: "$title",
                                regex: new RegExp(req.query.q),
                                options: "i"
                            }
                        },
                        {
                            $regexMatch: {
                                input: "$genre",
                                regex: new RegExp(req.query.q),
                                options: "i"
                            }
                        }
                    ]
                }
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
                res.json({data: result});
            }).catch(err => console.log(err));
    }
}

const search_update_book = async (req, res, next) => {
    if (ObjectId.isValid(req.body._id)) {

        await Book.findByIdAndUpdate(req.body._id, {is_readed: req.body.is_readed}, { new: true })
            .then(result => {
            })
            .catch((err) => console.log(err));

        return res.status(200).json({_id: req.body._id});
    }
    next();
}

const add_book = (req, res) => {
    res.render('add-book', { title: 'Dodaj' });
}

const add_book_to_database = (req, res) => {
    createUniqueGenre(req.body.genre);

    const book = new Book( {
        title: req.body.title,
        author: req.body.author,
        publishedDate: req.body.publishedDate,
        genre: req.body.genre
    });
    book.save()
        .then(result => console.log("Added book to database"))
        .catch(err => console.log(err));

    res.render('add-book', { title: 'Dodaj', is_added: true });
}

const book_details = async  (req, res, next) => {
    if (ObjectId.isValid(req.params.id)) {
        try {
            const book = await Book.findById(req.params.id);
            if (book) {
                return res.render('book-details', {title: book.title, book: book});
            }

        } catch (error) {
            console.log(error);
        }
    }
    next()
}

const book_details_update = async  (req, res, next) => {
    if (ObjectId.isValid(req.params.id)) {

        await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(result => {
                if (result) {
                    createUniqueGenre(result.genre);
                }
            })
            .catch((err) => console.log(err));

        return res.status(200).json({message: "Zaktualizowano"})
    }
    next();
}

const delete_book = async  (req, res, next) => {
    if (ObjectId.isValid(req.params.id)) {
        try {
            await Book.findByIdAndDelete(req.params.id);
            return res.json({redirect: '/books/search/'});
        }
        catch (err) {
            console.log(err);
        }
    }
    next();
}

const get_genres = (req, res) => {
    Genre.find()
        .then(result => {
            res.status(200).json({data: result});
        })
        .catch(err => console.log(err));
}
const createUniqueGenre = (name) => {
    Genre.findById(name).exec()
        .then(result => {
            if (!result) {
                const genre = new Genre( {
                    _id: name,
                    colorHex: getRandomColor()
                });
                genre.save()
                    .then(result => console.log("Added genre to database"))
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));

}

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
module.exports = {
    search,
    search_books,
    search_update_book,
    add_book,
    add_book_to_database,
    book_details,
    book_details_update,
    delete_book,
    get_genres,
}