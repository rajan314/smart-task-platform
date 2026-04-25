const mongoose  = require('mongoose');

const taskSchema = new mongoose.Schema({
   title:{
    type:String,
    required:[true,"task Title required"]
   },
   description:{
    type:String
   },
   project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  priority: {
  type: String,
  enum: ['low', 'medium', 'high'],
  default: 'medium'
    },

    dueDate: {
      type: Date
    }
 });


 module.exports = mongoose.model('Task',taskSchema);