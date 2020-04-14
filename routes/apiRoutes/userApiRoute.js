const router = require('express').Router()
const { loggedUser } = require('../../middlewares/loggedUser')
const { authenticate } = require('../../middlewares/authenticate')
const { updateProfile } = require('../../middlewares/updateProfile')
const { registerUser, loginUser, logoutUser, addProfile, verifyUser, searchUser } = require('../../controllers/apiControllers/userApiController')
const upload = require('../../fileUpload/multer/multer')

router.post('/signUp', registerUser)
router.post('/signIn',loggedUser , loginUser)
router.delete('/signOff/:userId',authenticate ,logoutUser)
router.post('/addProfile/:userId',authenticate,updateProfile, upload.single("uploadImage"), addProfile)
router.post('/verify/:userId', verifyUser)
router.post('/searchUser/:userId', searchUser)

module.exports = router