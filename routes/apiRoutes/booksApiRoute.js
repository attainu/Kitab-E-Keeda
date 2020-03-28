const router = require('express').Router()
const{allUserBooks} = require('../../controllers/apiControllers/booksApiController')

   
router.get('/books',allUserBooks);

module.exports = router;