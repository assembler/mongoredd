var async = require('async');
var _ = require('underscore');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoredd');
mongoose.set('debug', true);
require('./post');

var track = require('./reddit_tracker');
var reddit = require('./reddit');

reddit.top(function(data) {
  track(data, function(err) {
    if(err) console.log("***ERROR: ", err);
    else console.log("done");
    process.exit();
  });
});
