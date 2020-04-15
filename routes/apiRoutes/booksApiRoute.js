const router = require('express').Router()
const { postGenre, postFavAuthor, postBooksRead, addReviews, updateReview, deleteReview } = require('../../controllers/apiControllers/booksApiController')
const { getAllBooks, sortByGenres, sortByAuthors, sortByBooksRead, getSearchedBook } = require('../../controllers/apiControllers/getAllBookData')
const { authenticate } = require('../../middlewares/authenticate')
const BOOk = require('../../models/books')

router.post('/books/genre/:userId', authenticate, postGenre )
router.post('/books/favAuthor/:userId',authenticate, postFavAuthor )
router.post('/books/readBooks/:userId',authenticate, postBooksRead )
router.post('/books/addReview/:userId/:bookId', addReviews )

router.get('/books/getAllBooks', getAllBooks )
router.get('/books/sortByGenres/:userId', authenticate, sortByGenres )
router.get('/books/sortByAuthors/:userId', authenticate, sortByAuthors )
router.get('/books/sortByBooksRead/:userId', authenticate, sortByBooksRead )
router.get('/search/:bookId', getSearchedBook)

router.put('/updateReview/:userId/:reviewId', authenticate, updateReview )
router.delete('/deleteReview/:userId/:reviewId', authenticate, deleteReview)
router.post('/allbooks' , (req, res) => {
    BOOk.create({...req.body})
    res.status(200).send('books inserted')
})

module.exports = router