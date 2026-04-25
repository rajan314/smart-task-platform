const express = require('express');
const {register,login,getMe} = require('../controllers/authController');
const { protect,authorize } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/me', protect, getMe);
router.get('/admin',
  protect,
  authorize('admin'),
  (req,res)=>{
    res.json({
      message:"Welcome Admin"
    });
  }
);


module.exports = router;