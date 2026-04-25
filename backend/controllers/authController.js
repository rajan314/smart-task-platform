const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Generate token
const generateToken  = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
  expiresIn:process.env.JWT_EXPIRE
});
};

//@Desc Register user
exports.register = async (req,res)=>{
  try{
    const {name,email,password,role} = req.body;

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await User.create({
      name,
      email,
      password:hashedPassword,
      role
    });

    const token = generateToken(user._id);
    res.status(201).json({
      success:true,
      token
    });

  }catch(error){
    res.status(500).json({error:error.message});
  }
};

//@desc Login user

exports.login = async(req,res)=>{
  try{
    const {email,password} = req.body;

    //get  user with password
    const user = await User.findOne({email}).select('+password');
    if(!user){
      return res.status(401).json({message:"Invalid credentials"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(401).json({message:"Invalid Credentials"});
    }
    const token = generateToken(user._id);
    res.json({
      success:true,
      token
    });
  }catch(error){
    res.status(500).json({error:error.message});
  }
};

exports.getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};
