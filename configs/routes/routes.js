const Camps = require('../../databases/camps');
const express = require('express');
const router = express.Router();
//middlewares
middlewareAuth = require('../middlewares');
//GET ALL THE CAMPS
router.get('/',(req,res)=>{
   Camps.find({},(err,data)=>{
       if(err)
       res.redirect('/');
       else
       res.render('camps/campgrounds',{campgrounds:data});
   })
});
//Post new camp
router.post('/',middlewareAuth.isLoggedIn,(req,res)=>{

   let camp = {name:req.body.campname,
               image:req.body.image,
               price:req.body.price,
            description:req.body.description,
            author:{
                id:req.user._id,
                username:req.user.username
            }};
    Camps.create(camp,(err,data)=>{
        if(err)
         res.redirect('/campgrounds/new');
        else
        res.redirect('/campgrounds');
    })
    
});
// Route to form for the new camp
router.get('/new',middlewareAuth.isLoggedIn,(req,res)=>{
    res.render('camps/new');
})

//show page of one camp
router.get('/:id',(req,res)=>{

   Camps.findById(req.params.id).populate('comments').exec((err,data)=>{
       if(err||!data){
        console.log(err);
        res.redirect('back');
       }
       
       else{
     
        res.render('camps/show',{camp:data});
       }
       
   })
});
//EDIT CAMP ROUTE
router.get("/:id/edit",middlewareAuth.checkCampgroundOwner,(req,res)=>{
    
        Camps.findById(req.params.id,(err,camp)=>{
            if(err){
                res.redirect('back');
            }
            else     
            res.render('camps/edit',{'camp':camp});
           });
    
   
  
});

//UPDATE CAMP ROUTE
router.put("/:id",middlewareAuth.checkCampgroundOwner,(req,res)=>{
   let campdata = req.body.campedit;
   Camps.findByIdAndUpdate(req.params.id,{$set:campdata},(err,data)=>{
    if(err){
        res.redirect('back');
    }
    else  
    res.redirect(`/campgrounds/${data._id}`);
   });
});
//DESTROY CAMP ROUTE
router.delete("/:id",middlewareAuth.checkCampgroundOwner,(req,res)=>{
   Camps.findByIdAndRemove(req.params.id,(err,data)=>{
    if(err){
        res.redirect('back');
    }
    else   
    res.redirect("/campgrounds");
   })
});
module.exports=router;