var async = require('async');
var _ = require('underscore');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

function RedditTracker(data) {
  this.data = data;
}

RedditTracker.prototype.track = function(cb) {
  async.each(this.data, this.iterator.bind(this), cb);
};

RedditTracker.prototype.iterator = function(item, cb) {
  var _this = this;
  Post.findById(item.id, function(err, post){
    if(err) return cb(err);
    if(!post) {
      post = new Post(item);
      post._id = item.id;
    }
    post.ranks.push(item.rank);
    post.save(cb);
  });
};

module.exports = function(data, cb) {
  var tracker = new RedditTracker(data);
  tracker.track(cb);
};
