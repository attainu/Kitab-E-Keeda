const router = require('express').Router()
const { loggedUser } = require('../../middlewares/loggedUser')
const { updateProfile } = require('../../middlewares/updateProfile')
const { registerUser, loginUser, logoutUser, addProfile,sendOtp,verifyOtp } = require('../../controllers/apiControllers/userApiController')
const upload = require('../../fileUpload/multer/multer')

router.post('/user/register', registerUser) 
router.post('/user/login', loggedUser, loginUser)
router.delete('/user/logout', logoutUser)
router.post('/user/profile/:userId', updateProfile, upload.single("uploadImage"), addProfile)
router.post('/user/verify/sendotp' , sendOtp)
router.post('/user/verify/verifyotp' , verifyOtp) 

module.exports = router