

const router = require('express').Router()
const { postGenre, postFavAuthor, postReadBooks } = require('../../controllers/apiControllers/booksApiController')

router.post('/books/genre', postGenre )
router.post('/books/favAuthor', postFavAuthor )
router.post('/books/readBooks', postReadBooks )


module.exports = router    