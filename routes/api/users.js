const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const { json } = require("body-parser");

// check if the user has login or not - backend auth
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  })
})

// get list of the developer and manager(_id)
router.get('/authorities', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try{
    const developers = await User.find({permission:'developer'},'_id username').sort({username:-1}).exec();
    const managers = await User.find({permission:'manager'},'_id username').sort({username:-1}).exec();
    return res.json({managers,developers});
  }
  catch(err){
    return res.status(400).json({cannotfindpeople:'People are not available in server'})
  }
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  })
})
// register or sign up
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Check to make sure nobody has already registered with a duplicate username
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        // Throw a 400 error if the username address already exists
        return res.status(400).json({username: "A user has already registered with this username"})
      } else {
        // Otherwise create a new user
        const newUser = new User({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                const payload = {id: user.id, username: user.username, email: user.email,permission:user.permission};
                jwt.sign(payload, keys.secretOrKey,{expiresIn: 3600},(err,token)=>{
                  res.json({
                    success: true,
                    token:'Bearer' + token
                  })
                })
              })
              .catch(err => console.log(err));
          })
        })
      }
    })
})
// login route
router.post('/login', (req, res) => {
  const {errors,isValid} = validateLoginInput(req.body);
  if(!isValid){
    return res.status(400).json(errors)
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username})
    .then(user => {
      if (!user) {
        return res.status(404).json({username: 'This user does not exist'});
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {id: user.id, email: user.email, username: user.username, permission:user.permission};
            jwt.sign(
            payload,
            keys.secretOrKey,
            // Tell the key to expire in one hour
            {expiresIn: 3600},
            (err, token) => {
              res.json({
              success: true,
              token: 'Bearer ' + token
          });
        });
    } else {
      return res.status(400).json({password: 'Incorrect password'});
    }
    })
    })
})



module.exports = router;
