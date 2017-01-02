import path from 'path';
import express from 'express';
import swig from 'swig';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import './db/database';
import systemRoute from './app/routes/system';
import listRoute from './app/routes/list';
import orderRoute from './app/routes/order';

// express init
const app = express();
swig.setDefaults({autoescape: false});
app.set('views', path.join(__dirname, '/app/views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
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
app.use('/img', express.static('./app/img'));

app
  .use('/', systemRoute)
  .use('/', listRoute)
  .use('/', orderRoute);

app.listen(4000, () => console.info('正在监听4000端口...')); //eslint-disable-line

// test
// async function test() {
//   console.log(3);
//   const a = await new Promise((resolve) => {
//     setTimeout(() => resolve(1), 3000);
//   });
//   console.log(a);
// }
//
// test();

// TODO webpack is nessesary
