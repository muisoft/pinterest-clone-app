require('dotenv').config();
const createServer = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const flash = require('connect-flash');
const configurePassport  = require('./config/passport');
const router  = require('./server/routes/router');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5002);

require('./server/models')(process.env.DB_CONN);

const app = express();
const MongoStore = connectMongo(session);
const dev = app.get('env') !== 'production';

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'pinterestclone',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

if(!dev){
 app.use(morgan('common'));
 app.use(express.static(path.resolve(__dirname, 'build')));
 //The 'catch all' handler that route any route that is not match api routes to React index.html
 app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
 })
}
if(dev){
  app.use(morgan('dev'));
    app.use(express.static(path.join(__dirname, './public')));
}

app.use(cookieParser());
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

//We configure passport strategies
require('./server/config/passport')(passport);

app.use(router);


const server = createServer(app);
server.listen(PORT, err => {
  if(err) throw err;
  console.log('Server started');
});
