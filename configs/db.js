const mongoose = require('mongoose');
const Bluebird = require('bluebird');
mongoose.Promise  = Bluebird;
console.log(process.env.DATABASEURL);
module.exports = mongoose.connect(process.env.DATABASEURL,{
    useMongoClient:true
});