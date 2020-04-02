

const router = require('express').Router()
const { postGenre, postFavAuthor, postFavBooks } = require('../../controllers/apiControllers/booksApiController')

 router.post('/books/genre/:userId', postGenre )
 router.post('/books/favAuthor/:userId', postFavAuthor )
 router.post('/books/favBooks/:userId', postFavBooks )


module.exports = router    