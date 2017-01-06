import {Router} from 'express';
import mongoose from 'mongoose';

// TODO set time to do this
import mwsNode from 'amazon-mws-node';
import xml2js from 'xml2js';
import {head, map} from 'lodash';
import moment from 'moment';

moment.locale('zh-cn');

const mws = mwsNode({
  AmzSecretKey: 'yGVGXFONeUxQx5WNBG92Pv/js4YY3pXdtecRzpD+',
  AWSAccessKeyId: 'AKIAIXOUNVZVIIUIZVZQ'
});

const parser = new xml2js.Parser();

const User = mongoose.model('User');
const List = mongoose.model('List');
const GoodRank = mongoose.model('GoodRank');

const router = new Router();

const getList = (cb) => {
  console.log('here');
  mws({
    method: 'GET',
    base: 'mws.amazonservices.com',
    endpoint: '/Orders/2013-09-01',
    params: {
      Action: 'ListOrders',
      CreatedAfter: '2014-01-01',
      'MarketplaceId.Id.1': 'ATVPDKIKX0DER',
      SellerId: 'A1NU80VSKKU3LK',
      // 'MWSAuthToken': 'MWS_AUTH_TOKEN',
      Version: '2013-09-01'
    },
    callback: (error, response, body) => {
      parser.parseString(body, (err, result) => {
        // console.log(result.ListOrdersResponse.ListOrdersResult);
        if (result.ListOrdersResponse) {
          const order = result.ListOrdersResponse.ListOrdersResult[0].Orders[0].Order;
          const list = order.map(item => ({
            code: head(item.AmazonOrderId),
            time: moment(head(item.PurchaseDate)).format('lll'),
            name: head(item.BuyerName),
            country: item.ShippingAddress ? head(item.ShippingAddress[0].CountryCode) : '',
            remainTime: moment(head(item.LatestDeliveryDate)).fromNow()
          }));
          cb(list);
        }
      });
    }
  });
};

router.get('/listControl', (req, res) => {
  // get cookie & query list
  const username = req.session.username;
  if (username) {
    User.findOne({
      username
    }, (err, item) => {
      if (item) {
        getList(list => res.render('personal/order', {
          title: 'List',
          list: JSON.stringify(list)
        }));
      }
    });
  } else {
    res.render('personal/list', {
      title: 'Login',
      list: []
    });
    // res.redirect('/');
  }
});

router.get('/rank', (req, res) => {
  GoodRank.findOne({
  }, (err, item) => {
    let xAxis = [];
    let yAxis = [];
    if (item) {
      xAxis = map(item.rank, 'date');
      yAxis = map(item.rank, 'score');
    }
    res.render('personal/rank', {
      title: 'rank',
      xAxis: JSON.stringify(xAxis),
      yAxis: JSON.stringify(yAxis)
    });
  });
});

router.get('/addrank', (req, res) => {
  const arr = [
   {date: '2016-12-12', score: 10},
   {date: '2016-12-13', score: 100},
   {date: '2016-12-15', score: 20},
   {date: '2016-12-18', score: 40},
   {date: '2016-12-20', score: 80},
   {date: '2016-12-22', score: 66}
  ];

  const p = new GoodRank({
    skuid: '123124',
    rank: arr
  });

  p.save();

  res.send('Success');
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
