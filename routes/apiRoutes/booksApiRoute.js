const router = require('express').Router()
const { postGenre, postFavAuthor, postBooksRead, addReviews } = require('../../controllers/apiControllers/booksApiController')
const { getAllBooks, sortByGenres, sortByAuthors, sortByBooksRead } = require('../../controllers/apiControllers/getAllBookData')
const { authenticate } = require('../../middlewares/authenticate')

router.post('/books/genre/:userId', authenticate, postGenre )
router.post('/books/favAuthor/:userId',authenticate, postFavAuthor )
router.post('/books/readBooks/:userId',authenticate, postBooksRead )
router.post('/books/addReview/:userId/:bookId', addReviews )

router.get('/books/getAllBooks', getAllBooks )
router.get('/books/sortByGenres/:userID', authenticate, sortByGenres )
router.get('/books/sortByAuthors/:userID', authenticate, sortByAuthors )
router.get('/books/sortByBooksRead/:userID', authenticate, sortByBooksRead )


module.exports = router