const express = require('express');
const path = require('path');
var  bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
require('../passport/passport')(passport);
const app = express();

app.use(cookieParser());
app.use(session({
    secret:'4Under31Incode6',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
//CONFIGURACION DEL SERVIDOR
app.set('port',process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views',path.join(__dirname,'../pag'));
app.set('view engine','ejs');
//ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname,'../public/')));

module.exports = app;
