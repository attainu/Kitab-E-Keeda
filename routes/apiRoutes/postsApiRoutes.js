const router = require('express').Router()
const { createPosts, addComment, addLikes,addThreads } = require('../../controllers/apiControllers/postsApiController')

router.post('/addPosts/:userId', createPosts )
router.post('/addComments/:userId/:postId', addComment )
router.post('/addLikes/:userId/:postId', addLikes)
router.post('/addThreads/:userId/:commentId', addThreads)

module.exports = router