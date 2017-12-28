const mongoose = require('mongoose');
const Camps = require('./databases/camps');
const Comment = require('./databases/comments');
const User = require('./databases/user');
mongoose.Promise = global.Promise;
let data = [
    {name:'Clouds rest',image:'https://www.springhillcamps.com/assets/img/newfro-content-camp-center.jpg',
     description:'good camp'},
     {name:'Sails rest',image:'http://www.mysticseaport.org/wp-content/uploads/Joseph-Conrad-Summer-Sailing-Camp.jpg',
     description:'good good camp'},
     {name:'Girls rest',image:'http://2d6t692n0eb7333453op21it-wpengine.netdna-ssl.com/camps/files/2016/02/2016-2-Camps-CC-Iconic-1024x683.jpg',
     description:'Also good camp'},
];
let addcamps = async (camps)=>{
    let addcamps = await camps.forEach(camp=>{
              Camps.create(camp).then(()=>console.log('camp added'));
  });
}
let addcommentoAll = async(comment)=>{
    try {
        let camps = await Camps.find({});
        for(x=0;x<camps.length;x++){
            let add = await Camps.findByIdAndUpdate(camps[x]._id,{$addToSet:{comments:comment._id}});
            console.log('comment added');
        }
         
    } catch (error) {
      return error;  
    }
    
}
let seedb = async ()=>{
    try {
        let removecamps = await Camps.remove({}).then(()=>console.log('removed all camps'));
       // let addnewcamps = await addcamps(data);
        //let newcomment = await Comment.create({text:"First comment",author:"Hommers"});
       // let addcomments = await addcommentoAll(newcomment); 
      
    } catch (error) {
        console.log(error);
    }
  

}
module.exports = seedb;