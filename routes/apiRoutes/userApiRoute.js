const router = require('express').Router()
const { loggedUser } = require('../../middlewares/loggedUser')
const { authenticate } = require('../../middlewares/authenticate')
const { updateProfile } = require('../../middlewares/updateProfile')
const { registerUser, loginUser, logoutUser, addProfile } = require('../../controllers/apiControllers/userApiController')
const upload = require('../../fileUpload/multer/multer')

router.post('/signUp', registerUser)
router.post('/signIn', loggedUser, loginUser)
router.delete('/signOff',authenticate, logoutUser)
router.post('/profile/:userId',authenticate, updateProfile, upload.single("uploadImage"), addProfile)

module.exports = router