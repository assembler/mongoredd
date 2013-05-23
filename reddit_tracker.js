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
      console.log("Post: '" + item.id + "' not found");
      post = new Post(item);
      post._id = item.id;
      post.save(function(err, post){
        if(err) return cb(err);
        _this.pushRank(post, item.rank, cb);
      });
    } else {
      _this.pushRank(post, item.rank, cb);
    }
  });
};

RedditTracker.prototype.pushRank = function(post, rank, cb) {
  Post.update({ _id: post.id }, { $push: { ranks: rank }}, function(err, numAffected){
    if(err) return cb(err);
    console.log("Rank set on", post.id, ":", !!numAffected);
    cb(null);
  });
};

module.exports = function(data, cb) {
  var tracker = new RedditTracker(data);
  tracker.track(cb);
};
