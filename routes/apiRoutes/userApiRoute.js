const router = require('express').Router()
const {authenticate} = require('../../middlewares/authenticate')
const { registerUser, loginUser, logoutUser } = require('../../controllers/apiControllers/userApiController')

router.post('/register', registerUser)
router.post('/login', authenticate, loginUser)
router.delete('/logout', logoutUser)

module.exports = router