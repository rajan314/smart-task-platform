const express = require('express');
const router = express.Router();

const {createProject,getProjects} = require('../controllers/projectController');

const {protect, authorize} = require('../middleware/authMiddleware');

//Only admin and manager can create
router.post('/',protect,authorize('admin','manager'),createProject);

//All loged-in users can view
router.get('/',protect,getProjects);


module.exports = router;