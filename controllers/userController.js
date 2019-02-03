const User = require('../models/User')
const jwt = require('jsonwebtoken')


// SIGNING UP
module.exports.signUp = (req, res) => {

  console.log(req.body)
  
  // NEW USER
  let newUser = new User ({
    username: req.body.username,
    password: req.body.password
  })

  // SAVE USER
  newUser.save(err => {
    if (err) {
      console.log(err)
      res.json({errorMsg: 'error saving user', err: err})
      
    } else {
      res.sendStatus(201)
      console.log(`added ${req.body.username}`)
    }
  })
}

// SIGN IN
module.exports.signIn = (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    
    if (err) {
      res.json({error: 'error looking up user'})
    }

    else if(user == null || user == false || !user.username) {
      res.json({error: 'user not found'})
    }

    // PASSWORD MATCH
    else if(user.password == req.body.password && user != null && user) {
      
      const JWTToken = jwt.sign({
        email: user.email,
        _id: user._id
      },
      'secret'
       );
       return res.json({
         success: 'Welcome to the JWT Auth',
         token: JWTToken,
         user: user
       });

    } 
    
    // UNMATCHED PASSWORD
    else {
      res.json({error: 'wrong password'})
    }

    
  })
}