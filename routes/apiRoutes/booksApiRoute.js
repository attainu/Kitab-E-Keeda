const router = require('express').Router()
const { postGenre, postFavAuthor, postBooksRead, addReviews } = require('../../controllers/apiControllers/booksApiController')
const { getAllBooks, sortByGenres, sortByAuthors, sortByBooksRead } = require('../../controllers/apiControllers/getAllBookData')
const { authenticate } = require('../../middlewares/authenticate')

router.post('/books/genre/:userId', authenticate, postGenre )
router.post('/books/favAuthor/:userId',authenticate, postFavAuthor )
router.post('/books/readBooks/:userId',authenticate, postBooksRead )
router.post('/books/addReview/:userId/:bookId',authenticate, addReviews )

router.get('/books/getAllBooks', getAllBooks )
router.get('/books/sortByGenres/:userID', sortByGenres )
router.get('/books/sortByAuthors/:userID', sortByAuthors )
router.get('/user/sortByBooksRead/:userID', sortByBooksRead )


module.exports = router