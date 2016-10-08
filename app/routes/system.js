var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('user');

var encrypt = require('../utils/encrypt');

// loginPage
router.get('/', function(req, res, next){
  res.render('system/login', {
    title: 'Login'
  })
});

// registerPage
router.get('/registerPage', function(req, res, next){
  res.render('system/register', {
    title: 'Register'
  })
});

// loginApi
router.post('/register', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  User.find({ username: username }, function(err, result){
    if(result.length){
      res.send('user has existed');
    }else{
      var hash = encrypt(password);
      new User({
        username: username,
        password: hash
      })
      .save(function(err, user){
        console.log(user);
        res.send('success');
      })
    }
  })
  
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var hash = encrypt(password);
  User.find({
    username: username,
    password: hash
  }, function(err, result){
    if(result.length){
      res.send('success');
    }else{
      res.send('wrong username/password');
    }
  })
});

module.exports = router;