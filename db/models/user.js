var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// init user
var UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  list: [{
    type: Schema.Types.ObjectId,
    ref: 'List'
  }]
});

var ListSchema = new Schema({
  title: String,
  content: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

var User = mongoose.model('User', UserSchema);
var List = mongoose.model('List', ListSchema);
