const Comments = require('../../databases/comments');
const Camps = require('../../databases/camps');
const express = require('express');
const router = express.Router({mergeParams:true});
//middlewares
middlewareAuth = require('../middlewares');
//comments show edit
router.get('/:comments_id/edit',middlewareAuth.checkCommentOwner,(req,res)=>{
    Comments.findById(req.params.comments_id,(err,data)=>{
     
        res.render('comments/edit',{camp_id:req.params.id,comment:data});
    })
   
});
//comments update
router.put('/:comments_id',middlewareAuth.checkCommentOwner,(req,res)=>{
  Comments.findByIdAndUpdate(req.params.comments_id,req.body.comment,(err,data)=>{
   
        res.redirect(`/campgrounds/${req.params.id}`);
  });
})
//comments delete
router.delete('/:comments_id',middlewareAuth.checkCommentOwner,(req,res)=>{
    Comments.findByIdAndRemove(req.params.comments_id,(err,data)=>{
        req.flash('success','Comment deleted');
            res.redirect(`/campgrounds/${req.params.id}`);
    })
})
//edit form to create
router.get('/new',middlewareAuth.isLoggedIn,(req,res)=>{
    console.log(req.params.id);
    Camps.findById(req.params.id,(err,data)=>{
       if(err||!data){
        req.flash('error','Campground not found');
           redirect('back');
        console.log(err);
       }
       
       else{
          
        res.render('comments/new',{camp:data});
       }
       
    });
   
 });
 //create new comment
 router.post('/',middlewareAuth.isLoggedIn,(req,res)=>{
    let comment = req.body.comment;
    Camps.findById(req.params.id,(err,camp)=>{
        if(err||!camp){
          req.flash('error','Campground not found');
          res.redirect('/campgrounds');
        }
        
        else
        {
          let commentoAdd = {
            text: req.body.text,
            author:{
                id: req.user._id,
                username : req.user.username
            }       
          }
          Comments.create(commentoAdd,(err,data)=>{
            if(err||!data){
              res.redirect('back');
              console.log(err);
            }
            
            else
             {
                console.log(data._id); 
                //add username and his/her id
                 camp.comments.push(data._id);
                 camp.save();
                 req.flash('success','Successfully added comment');
                 res.redirect(`/campgrounds/${camp._id}`);
             }
          })
        }
    })
  });
  module.exports = router;