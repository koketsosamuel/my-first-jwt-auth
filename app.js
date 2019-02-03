const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/config')
const jwt = require('jsonwebtoken')

// MONGOOSE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/jwtauth', config.dbConnOpp)
  .then((res, err) => {
    if (err) {
      res.json({error: 'failed connecting to the database, check if there could be server issues'})
    }
  })

// MY REQUISITIONS
const userRoutes = require('./routes/userRoutes')

const app = express()

// MIDDLEWARE
app.use(bodyParser.json())
app.use(cors())

// ROUTES
app.use('/user', userRoutes)
app.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secret', 
    (err, authData) => {
      if (err) {
        res.json({message: err})
      } else {
        res.json({message: 'auth successful', user: authData})
      }
      
    }
  )

  
})

// VERIFY TOKEN
function verifyToken (req, res, next) {

  const bearerHeader = req.headers['authorization']

  // check if it is not undefined
  if(typeof bearerHeader !== 'undefined') {

    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]

    req.token = bearerToken

    next()

  } else {
    res.sendStatus(403)
  }

}

// LISTENING
app.listen(3000)