const mongoose = require('mongoose');

let campSchema = new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    description:String,
    author:{
        id : {type:mongoose.Schema.Types.ObjectId,ref:"User"},
        username:String
    },
    comments : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        default:[]
    }]
},{
    usePushEach: true 
});

module.exports= mongoose.model('Camp',campSchema);