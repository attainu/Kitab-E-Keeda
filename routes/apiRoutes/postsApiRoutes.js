const router = require('express').Router()
const { createPosts, addComment, addLikes, addThreads, getPosts } = require('../../controllers/apiControllers/postsApiController')
const { authenticate } = require('../../middlewares/authenticate')

router.post('/addPosts/:userId', authenticate, createPosts )
router.post('/addComments/:userId/:postId',authenticate, addComment )
router.post('/addLikes/:userId/:postId',authenticate, addLikes)
router.post('/addThreads/:userId/:commentId',authenticate, addThreads)

router.get('/getposts/:userId',authenticate, getPosts)

module.exports = router