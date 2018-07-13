'use strict';

require('dotenv').config();

var _require = require('http'),
    createServer = _require.createServer;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var morgan = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

var normalizePort = function normalizePort(port) {
  return parseInt(port, 10);
};
var PORT = normalizePort(process.env.PORT || 5002);

require('./server/models')(process.env.DB_CONN);

var app = express();
//const MongoStore = connectMongo(session);
var dev = app.get('env') !== 'production';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'pinterestclone',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

if (!dev) {
  app.use(morgan('common'));
  app.use(express.static(path.resolve(__dirname, 'build')));
  //The 'catch all' handler that route any route that is not match api routes to React index.html
  app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}
if (dev) {
  app.use(morgan('dev'));
  //app.use(express.static(path.join(__dirname, './public')));
}

app.use(cookieParser());
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

//We configure passport strategies
require('./server/config/passport')(passport);
var router = require('./server/routes/router');
app.use(router);

var server = createServer(app);
server.listen(PORT, function (err) {
  if (err) throw err;
  console.log('Server started');
});