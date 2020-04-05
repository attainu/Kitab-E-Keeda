const router = require('express').Router()
const { postGenre, postFavAuthor, postReadBooks, addReviews } = require('../../controllers/apiControllers/booksApiController')
const { authenticate } = require('../../middlewares/authenticate')

router.post('/books/genre/:userId', authenticate, postGenre )
router.post('/books/favAuthor/:userId',authenticate, postFavAuthor )
router.post('/books/readBooks/:userId',authenticate, postReadBooks )
router.post('/books/addReview/:userId/:bookId',authenticate, addReviews)

module.exports = router