// backend/controllers/taskController.js

const Task = require('../models/Task');
const Project = require('../models/Project');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      project,
      assignedTo,
      priority,
      dueDate
    } = req.body;

    const existingProject = await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    if (!existingProject.members.includes(req.user._id)) {
      return res.status(403).json({
        message: 'Not a project member'
      });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo: assignedTo || req.user._id,
      status: 'todo',
      priority: priority || 'medium',
      dueDate
    });

    res.status(201).json({
      success: true,
      task
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// Get Tasks By Project
exports.getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId
    }).populate('assignedTo', 'name email');

    res.json({
      success: true,
      tasks
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// Update Task Status
exports.updateTask = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    if (
      task.assignedTo.toString() !== req.user._id.toString() &&
      !['admin', 'manager'].includes(req.user.role)
    ) {
      return res.status(403).json({
        message: 'Not allowed to update this task'
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      task: updatedTask
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Task deleted'
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};