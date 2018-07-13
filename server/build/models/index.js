'use strict';

var mongoose = require('mongoose');

module.exports = function (url) {
  mongoose.connect(url);
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', function (err) {
    console.error('Mongoose connection error ' + err);
    process.exit(1);
  });
  //We are connected
  require('./user');
  require('./pin');
};