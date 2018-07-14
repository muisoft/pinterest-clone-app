const { createServer } = require('http');
const express = require('express');
const compression = require('compression');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require( 'express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require( 'mongoose');
const passport = require( 'passport');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5002);

require('./server/models')('mongodb://localhost:27017/pinterestclone');

const app = express();
const dev = app.get('env') !== 'production';

app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: "mysecret",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
// Check if we are in Production
if(!dev){
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('common'));

  app.use(express.static(path.resolve(__dirname, 'build')));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}
 //Also check if we are not in production
if(dev){
  app.use(morgan('dev'));
}

app.use( passport.initialize());
app.use( passport.session());

require('./server/config/passport')(passport);

const router = require('./server/routes/router');
app.use(router);

const server = createServer(app);
server.listen(PORT, err => {
  if(err) throw err;
  console.log('Server started');
})
