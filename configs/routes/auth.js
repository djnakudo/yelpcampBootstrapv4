const User = require('../../databases/user');
const express = require('express');
const passport = require('passport');
const router = express.Router();
 //register routes
    //SHOW
    router.get('/register',(req,res)=>{
        res.render('register');
      });
      //create a user
      router.post('/register',(req,res)=>{
          User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
              if(err){
                req.flash('error',err.message)
              return res.render('register',{error:req.flash('error')});
              }
              else{
                  passport.authenticate('local')(req,res,()=>{
                      req.flash('success',`Welcome aboard ${user.username}!`);
                      res.redirect('/campgrounds');
                  })
              }
             
          })
      });
      //login routes
         //SHOW  form for the login
       router.get('/login',(req,res)=>{
           res.render('login');
       });
         //FIND user using passport-local-mongoose plugin
       router.post('/login',passport.authenticate('local',{
           successRedirect:'/campgrounds',
           failureRedirect:'/login'
       }),(req,res)=>{
    
       });
       //logout route
       router.get('/logout',(req,res)=>{
        req.flash('success',`See you again ${req.user.username}`); 
        req.logout();
           
           res.redirect('/campgrounds');
       });
       module.exports= router;