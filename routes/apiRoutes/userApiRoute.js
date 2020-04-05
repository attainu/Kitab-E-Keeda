const router = require('express').Router()
const { authenticate } = require('../../middlewares/authenticate')
const { updateProfile } = require('../../middlewares/updateProfile')
const { registerUser, loginUser, logoutUser, addProfile,sendOtp,verifyOtp } = require('../../controllers/apiControllers/userApiController')
const upload = require('../../fileUpload/multer/multer')

router.post('/register', registerUser) 
router.post('/login', authenticate, loginUser)
router.delete('/logout', logoutUser)
router.post('/profile/:userId', updateProfile, upload.single("uploadImage"), addProfile)
router.post('/sendotp' , sendOtp)
router.post('/verifyotp' , verifyOtp) 

module.exports = router