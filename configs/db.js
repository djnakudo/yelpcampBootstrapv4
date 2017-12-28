const mongoose = require('mongoose');
const Bluebird = require('bluebird');
mongoose.Promise  = Bluebird;
//local deploy
//const url = 'mongodb://localhost/camps';
const url = 'mongodb://nakajima:bing12@ds143330.mlab.com:43330/yelpcampnaks';
// local deployment : url mongodb://localhost/camps
//mongodb://nakajima:bing12@ds143330.mlab.com:43330/yelpcampnaks
module.exports = mongoose.connect('mongodb://nakajima:bing12@ds143330.mlab.com:43330/yelpcampnaks',{
    useMongoClient:true
});