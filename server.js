
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import morgan from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import flash from 'connect-flash';
import configurePassport  from './config/passport';
import { router } from './routes/router';



const app = express();
const MongoStore = connectMongo(session);
const PORT = process.env.PORT || 5002;
const dev = app.get('env') !== 'production';

if(!dev){
 app.use(morgan('common'));
 app.use(express.static(path.resolve(__dirname, 'build')));
 //The 'catch all' handler that route any route that is not match api routes to React index.html
 app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
 })
}
if(dev){
  app.use(morgan('dev'));
    app.use(express.static(path.join(__dirname, './public')));
}
app.use(cookieParser());
app.use(session({
    secret: 'pinterestclone',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }));


configurePassport(passport);
app.use(router);


const server = app.listen(PORT);
