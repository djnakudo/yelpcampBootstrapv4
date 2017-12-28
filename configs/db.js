const mongoose = require('mongoose');
const Bluebird = require('bluebird');
mongoose.Promise  = Bluebird;
module.exports = mongoose.connect('mongodb://localhost/camps',{
    useMongoClient:true
});