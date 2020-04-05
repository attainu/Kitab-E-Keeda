

const router = require('express').Router()
const { postGenre, postFavAuthor, postFavBooks, getallGenres,getAllBooks,getFavBooks,getFavAuthors} = require('../../controllers/apiControllers/booksApiController')



 router.post('/books/genre/:userId', postGenre )
 router.post('/books/favAuthor/:userId', postFavAuthor )
 router.post('/books/favBooks/:userId', postFavBooks )


 //all get routes 
 router.get('/user/home', getAllBooks)
 router.get('/user/genres/:userID', getallGenres )
 router.get('/user/FavAuthors/:userID', getFavAuthors )
 router.get('/user/FavBooks/:userID', getFavBooks )



module.exports = router    