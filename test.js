var mws = require('amazon-mws-node')({
  AmzSecretKey: 'yGVGXFONeUxQx5WNBG92Pv/js4YY3pXdtecRzpD+',
  AWSAccessKeyId: 'AKIAIXOUNVZVIIUIZVZQ'
});

var fs = require('fs');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();

mws({
  method: 'GET',
  base: 'mws.amazonservices.com',
  endpoint: '/Orders/2013-09-01',
  params: {
    'Action': 'ListOrders',
    'CreatedAfter': '2014-01-01',
    'MarketplaceId.Id.1': 'ATVPDKIKX0DER',
    'SellerId': 'A1NU80VSKKU3LK',
    // 'MWSAuthToken': 'MWS_AUTH_TOKEN',
    'Version': '2013-09-01'
  },
  callback: function (error, response, body) {
    parser.parseString(body, function (err, result) {
      console.dir(result);
      fs.writeFileSync('result.json', JSON.stringify(result, null, 2));
      console.log('Done');
    });
  }
});
