const mongoose = require('mongoose');

module.exports = (url) => {
  mongoose.connect(url);
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', err => {
    console.error(`Mongoose connection error ${err}`);
    process.exit(1);
  });
  //We are connected
  require('./user');
  require('./pin');
}
