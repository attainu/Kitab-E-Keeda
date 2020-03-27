const router = require('express').Router()
const {authenticate} = require('../../middlewares/authenticate')
const { registerUser, loginUser, logoutUser, addProfile } = require('../../controllers/apiControllers/userApiController')
const upload = require('../../fileUpload/multer/multer')

router.post('/register', registerUser)
router.post('/login', authenticate, loginUser)
router.delete('/logout', logoutUser)
router.post('/profile', upload.single("uploadImage"), addProfile)

module.exports = router