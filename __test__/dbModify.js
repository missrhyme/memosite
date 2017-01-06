var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/good_rank');

var GoodRankSchema = new Schema({
  skuid: String,
  rank: Array
});

mongoose.model('GoodRank', GoodRankSchema);
var GoodRank = mongoose.model('GoodRank');

var arr = [
 {date: '2016-12-12', score: 10},
 {date: '2016-12-13', score: 100},
 {date: '2016-12-15', score: 20},
 {date: '2016-12-18', score: 40},
 {date: '2016-12-20', score: 80},
 {date: '2016-12-22', score: 66}
];

var p = new GoodRank({
  skuid: '123124',
  rank: arr
});

p.save();
