const router = require('express').Router()
const { createPosts } =require('../../controllers/apiControllers/postsApiController')

router.post('/post', createPosts)

module.exports = router