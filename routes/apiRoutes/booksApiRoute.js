
const router = require('express').Router()
const { postGenre, postFavAuthor, postFavBooks,  addReviews ,getSearchedBook , getallGenres,getAllBooks,getFavBooks,getFavAuthors} = require('../../controllers/apiControllers/booksApiController')

const { authenticate } = require('../../middlewares/authenticate')

 router.post('/books/genre/:userId' ,authenticate, postGenre )
 router.post('/books/favAuthor/:userId' ,authenticate, postFavAuthor )
 router.post('/books/favBooks/:userId' ,authenticate, postFavBooks )
 router.post('/books/addReview/:userId/:bookId',authenticate, addReviews )


 //all get routes 
 router.get('/user/home', getAllBooks)
 router.get('/user/genres/:userID', getallGenres )
 router.get('/user/FavAuthors/:userID', getFavAuthors )
 router.get('/user/FavBooks/:userID', getFavBooks )
 router.get('/search/:bookId', getSearchedBook)
 


module.exports = router    