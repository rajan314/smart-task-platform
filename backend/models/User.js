const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please Enter Name"]
  },
  email:{
    type:String,
    required:[true,"Please Enter Email"],
    unique:true
  },
  password:{
    type:String,
    required:[true,"Please enter Password"],
    minlenght:6,
    select:false
  },
  role:{
    type:String,
    default:["Admin","manager","member"],
    default:"member"
  },
  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("User",userSchema);