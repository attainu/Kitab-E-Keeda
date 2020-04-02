

const router = require('express').Router()
const { postGenre, postFavAuthor, postFavBooks } = require('../../controllers/apiControllers/booksApiController')

 router.post('/books/genre', postGenre )
router.post('/books/favAuthor', postFavAuthor )
 router.post('/books/favBooks', postFavBooks )


module.exports = router    