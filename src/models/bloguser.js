const mongoose = require("mongoose");

const BlogUserSchema = new mongoose.Schema({
  name:{type:String},
  email:{type:String},
  password:{type:String},
  otp:{type:String, min:6},
  otpExpiry:{type:Date}
},{collection:"User"})

const BlogUserModel = mongoose.model("User",BlogUserSchema);

module.exports = BlogUserModel;
