require('./db/database');

var express = require('express');
var swig = require('swig');
var bodyParser = require('body-parser');

var systemRoute = require('./app/routes/system');
var initDatabase = require('./db/database');

// express init
var app = express();

app.set('views', __dirname + '/app/views');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', systemRoute);

app.listen(3000, function(){
  console.log('正在监听3000端口...');
})