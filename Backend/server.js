// Connect DB and middlewares
const express = require('express');
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv=require("dotenv");
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.json());

// Connect DB
connectDB();

app.use('/api/user', require('./routes/userRoute'));
app.use('/api/post', require("./routes/postRoute"))

app.get("/", (req, res) => {
  res.send("HIII!!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
