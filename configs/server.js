const express = require('express');
const request = require('request');
const User = require('../databases/user');
const bodyparser = require('body-parser');
const flash = require('connect-flash');
let passport = require('passport'),
LocalStrategy = require('passport-local');
session = require('express-session');
methodOverride = require('method-override');
let app = express();
app.use(flash());
//removing configs from __dirname

app.use(express.static(`${__dirname.split('/configs')[0]}/public`));
let db = require('../configs/db');
app.use(methodOverride("_method"));
//passport configuration
app.use(session({
    secret:'Bulbasaur',
    resave:false,
    saveUninitialized:false
}));
app.use(bodyparser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
app.set('view engine','ejs');
//middleware to pass global variables to every route
app.use((req,res,next)=>{
    res.locals.currentuser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
}) 
module.exports ={app,passport};
 
