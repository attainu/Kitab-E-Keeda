const router = require('express').Router()
const { createPosts, addComment, addLikes } = require('../../controllers/apiControllers/postsApiController')

router.post('/addPosts/:userId', createPosts )
router.post('/addComments/:userId/:postId', addComment )
router.post('/addLikes/:userId/:postId', addLikes)

module.exports = router