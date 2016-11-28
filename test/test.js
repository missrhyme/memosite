var fs = require('fs');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/test.xml', function(err, data) {
  parser.parseString(data, function (err, result) {
    console.dir(result);
    fs.writeFileSync('result.json', JSON.stringify(result, null, 2));
    console.log('Done');
  });
});
