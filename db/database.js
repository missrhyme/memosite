require('./models/user');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user_account');