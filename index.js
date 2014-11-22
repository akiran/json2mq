var camel2hyphen = require('string-convert/camel2hyphen');

var isDimension = function (feature) {
  var re = /[height|width]$/;
  return re.test(feature);
};

var obj2mq = function (obj) {
  var mq = '';
  if (obj.type) {
    mq += obj.type + ' and ';
    delete obj.type;
  }
  var features = Object.keys(obj);
  features.forEach(function (feature, index) {
    var value = obj[feature];
    feature = camel2hyphen(feature);
    // Add px to dimension features
    if (isDimension(feature) && typeof value === 'number') {
      value = value + 'px';
    }
    if (value === true) {
      mq += '(' + feature + ') and ';
    } else {
      mq += '(' + feature + ': ' + value + ') and ';
    }
  });
  // Remove extra 'and' at the end
  mq = mq.replace(/ and $/, '');
  return mq;
};

var json2mq = function (query) {
  var mq = '';
  if (typeof query === 'string') {
    return query;
  }
  if (query instanceof Array) {
    query.forEach(function (q) {
      mq += obj2mq(q) + ', ';
    });
    // Remove extra comma at the end
    mq = mq.replace(/, $/, '');
    return mq;
  }
  return obj2mq(query);
};

module.exports = json2mq;