const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');




dotenv.config();

connectDB();

const app = express();



//Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);


//test route
app.get('/',(req,res)=>{
  res.send('API is Running...');
});
console.log("MONGO_URI:", process.env.MONGO_URI);

//server
const PORT = process.env.port || 5000;

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});