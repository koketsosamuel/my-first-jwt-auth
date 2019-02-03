const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// ROUTES
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)



// EXPORTATION
module.exports = router
