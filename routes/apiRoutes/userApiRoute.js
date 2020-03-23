const router = require('express').Router()
const { registerUser } = require('../../controllers/apiControllers/userApiController')

router.get('/register', registerUser)

module.exports = router