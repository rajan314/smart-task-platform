const Project = require('../models/Project');

// create projects

exports.createProject = async (req,res)=>{
  try{
    const {name,description} = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy:req.user._id,
      members:[req.user._id]
    });
    res.status(201).json({
      success:true,
      project
    });
  }catch(error){
    res.status(500).json({error: error.message});
  }
};

// Get all projects (user-based)
exports.getProjects = async(req,res)=>{
  try{
    const projects = await Project.find({
      members:req.user._id
    }).populate('members','name email');
    res.json({
      success:true,
      projects
    });
  }catch(error){
    res.status(500).json({
      error:error.message
    });
  }
};