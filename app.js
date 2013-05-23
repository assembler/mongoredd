var async = require('async');
var _ = require('underscore');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoredd');
mongoose.set('debug', true);
require('./post');

var track = require('./reddit_tracker');
var data = [
  { id: 'one', title: 'first' },
  { id: 'two', title: 'second' },
  { id: 'three', title: 'third' },
  { id: 'four', title: 'fourth' },
  { id: 'five', title: 'fifth' }
];

// shuffle the data and determine ranks
data = _.chain(data)
        .shuffle()
        .map( function(item, index){
          item.rank = index + 1;
          return item;
        })
        .value();

track(data, function(err) {
  if(err) console.log("***ERROR: ", err);
  else console.log("done");
  process.exit();
});
