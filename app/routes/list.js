var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var List = mongoose.model('List');

router.get('/listControl', function(req, res, next){
  // get cookie & query list
  var username = req.session.username;
  if(username){
    User.findOne({
      username: username
    }, function(err, item){
      List.find(item.list, function(err, result){
        res.render('personal/list', {
          title: 'Login',
          list: result
        })
      });
    })
  }else{
    res.redirect('/');
  }
});

router.post('/addItem', function(req, res, next){
  var title = req.body.title;
  var content = req.body.content;
  var username = req.session.username;
  User.findOne({
    username: username
  }, function(err, item){
    var i = new List({
      title: title,
      content: content,
      owner: item
    });
    i.save();
    item.list.push(i);
    item.save();
    res.send('add Success');
  })
});

module.exports = router;
