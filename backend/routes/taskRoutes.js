const express = require('express');
const router = express.Router();

const {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const { protect } = require('../middleware/authMiddleware');

// Create Task
router.post('/', protect, createTask);

// Get tasks of a project
router.get('/project/:projectId', protect, getProjectTasks);

// Update task status
router.put('/:id', protect, updateTask);

router.delete('/:id', protect, deleteTask);

module.exports = router;