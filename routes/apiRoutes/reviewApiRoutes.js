const router = require('express').Router()
const { postBookReview } = require('../../controllers/apiControllers/reviewApiController')

 router.post('/review/book/:bookid', postBookReview) 
 


module.exports = router    