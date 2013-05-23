var http = require('http');
var _ = require('underscore');

module.exports.top = function(cb) {
  http.get('http://www.reddit.com/top.json?sort=new&limit=100', function(res){
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      var children = JSON.parse(data).data.children;
      children = _.map(children, function(child, index){
        child = child.data;
        child.rank = index + 1;
        return child;
      });
      cb(children);
    });
  });
};
