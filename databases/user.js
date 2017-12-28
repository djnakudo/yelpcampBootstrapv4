const mongoose = require('mongoose');
const passportmongoose = require('passport-local-mongoose');
const UserSchema = new mongoose.Schema({
    username:String,
    password:String
});
UserSchema.plugin(passportmongoose);
module.exports = mongoose.model('User',UserSchema);