import {Router} from 'express';
import mongoose from 'mongoose';

import encrypt from '../utils/encrypt';

const User = mongoose.model('User');
const router = new Router();

// loginPage
router.get('/', (req, res) => {
  res.render('system/login', {
    title: 'Login'
  });
});

// registerPage
router.get('/registerPage', (req, res) => {
  res.render('system/register', {
    title: 'Register'
  });
});

// loginApi
router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.find({username}, (err, result) => {
    if (result.length) {
      res.send('user has existed');
    } else {
      const hash = encrypt(password);
      new User({
        username,
        password: hash
      })
      .save((error, user) => {
        console.log(user);
        res.send('success');
      });
    }
  });
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hash = encrypt(password);
  User.find({
    username,
    password: hash
  }, (err, result) => {
    if (result.length) {
      req.session.username = username;
      res.redirect('/listControl');
    } else {
      res.render('system/login', {
        invalid: true
      });
    }
  });
});

module.exports = router;
