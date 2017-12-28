const middlewareObj = {};
const Camps = require('../databases/camps');
const Comments = require('../databases/comments');
middlewareObj.checkCampgroundOwner=(req,res,next)=>{
    if(req.isAuthenticated()){
        Camps.findById(req.params.id,(err,camp)=>{
            if(err||!camp){
                req.flash('error','Campground not found!');
                res.redirect('back');
            }
            else {
                if(camp.author.id.equals(req.user._id))
                next();
                else{
                    req.flash('error','permission denied!');
                    res.redirect(`back`);
                }
                
            }
            
           });
    }
    else{
        req.flash('error','You need to be logged in to do that!');
        res.redirect('back');
    }
}
middlewareObj.isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('error','please login first');
        res.redirect('/login');
    }
}
middlewareObj.checkCommentOwner=(req,res,next)=>{
    if(req.isAuthenticated()){
        Comments.findById(req.params.comments_id,(err,comment)=>{
            if(err|| !comment){
                req.flash('error','Comment not found!');
                res.redirect('back');
            }
            else {
                if(comment.author.id.equals(req.user._id))
                next();
                else{
                    req.flash('error','permission denied!');
                    res.redirect(`back`);
                }
            }
            
           });
    }
    else{
        req.flash('error','You need to be logged in to do that!');
        res.redirect('back');
    }
}
module.exports=middlewareObj;
