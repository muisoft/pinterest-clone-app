'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _passport3 = require('../config/passport');

var _passport4 = _interopRequireDefault(_passport3);

var _router = require('../routes/router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
var PORT = process.env.PORT || 5000;
var dev = app.get('env') !== 'production';

if (!dev) {
  app.use((0, _morgan2.default)('common'));
  app.use(_express2.default.static(_path2.default.resolve(__dirname, 'build')));
  //The 'catch all' handler that route any route that is not match api routes to React index.html
  app.get('*', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, 'build', 'index.html'));
  });
}
if (dev) {
  app.use((0, _morgan2.default)('dev'));
  app.use(_express2.default.static(_path2.default.join(__dirname, './public')));
}
app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)({
  secret: 'pinterestclone',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: _mongoose2.default.connection })
}));
app.use(_passport2.default.initialize());
app.use((0, _connectFlash2.default)());
app.use(_passport2.default.session());

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

(0, _passport4.default)(_passport2.default);
app.use(_router.router);

var server = app.listen(PORT);