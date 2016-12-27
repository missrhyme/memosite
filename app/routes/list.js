import {Router} from 'express';
import mongoose from 'mongoose';

const User = mongoose.model('User');
const List = mongoose.model('List');

const router = new Router();

router.get('/listControl', (req, res) => {
  // get cookie & query list
  const username = req.session.username;
  if (username) {
    User.findOne({
      username
    }, (err, item) => {
      List.find(item.list, (error, result) => {
        res.render('personal/list', {
          title: 'Login',
          list: result
        });
      });
    });
  } else {
    res.render('personal/list', {
      title: 'Login',
      list: []
    });
    // res.redirect('/');
  }
});

router.post('/addItem', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const username = req.session.username;
  User.findOne({
    username
  }, (err, item) => {
    const i = new List({
      title,
      content,
      owner: item
    });
    i.save();
    item.list.push(i);
    item.save();
    res.send('add Success');
  });
});

export default router;
