const express = require('express');
const moongose=require('mongoose')
require('dotenv').config()
const user=require('./schema.js')
const { resolve } = require('path');
const app = express();
const port = 3010;
app.use(express.json())
mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(()=>console.log("connected to the database successfully")).catch((err)=>console.log("error connecting to the database",err))
app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new user(userData);
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res
        .status(400)
        .json({ message: 'Validation error', details: error.message });
    } else {
      res.status(500).json({ message: 'Server error', details: error.message });
    }
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
