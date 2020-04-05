const router = require('express').Router()
const { loggedUser } = require('../../middlewares/loggedUser')
const { updateProfile } = require('../../middlewares/updateProfile')
const { registerUser, loginUser, logoutUser, addProfile } = require('../../controllers/apiControllers/userApiController')
const upload = require('../../fileUpload/multer/multer')

router.post('/register', registerUser)
router.post('/login', loggedUser, loginUser)
router.delete('/logout', logoutUser)
router.post('/profile/:userId', updateProfile, upload.single("uploadImage"), addProfile)

module.exports = router