const router = require('express').Router()
const { loggedUser } = require('../../middlewares/loggedUser')
const { authenticate } = require('../../middlewares/authenticate')
const { updateProfile } = require('../../middlewares/updateProfile')
const { followedUser } = require('../../middlewares/followedUser')
const { registerUser, loginUser, logoutUser, addProfile, followUser } = require('../../controllers/apiControllers/userApiController')
const upload = require('../../fileUpload/multer/multer')

router.post('/signUp', registerUser)
router.post('/signIn', loggedUser, loginUser)
router.delete('/signOff',authenticate, logoutUser)
router.post('/addProfile/:userId',authenticate, updateProfile, upload.single("uploadImage"), addProfile)
router.post('/follow/:follower/:following',followedUser, followUser)

module.exports = router