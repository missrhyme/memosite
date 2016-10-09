require('./db/database');

var path = require('path');
var express = require('express');
var swig = require('swig');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var systemRoute = require('./app/routes/system');
var listRoute = require('./app/routes/list');
var initDatabase = require('./db/database');

// express init
var app = express();

app.set('views', __dirname + '/app/views');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(session({
    resave: false,  
    saveUninitialized: true,
    secret: 'memosite',
    cookie: {
      maxAge: 60000
    }
  }));

app.use('/css', express.static('./app/css'));
app.use('/js', express.static('./app/js'));
app.use('/lib', express.static('./app/lib'));

app
  .use('/', systemRoute)
  .use('/', listRoute);

app.listen(3000, function(){
  console.log('正在监听3000端口...');
})