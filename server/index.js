const express=require('express');
const cors=require('cors');
require("dotenv").config();
const connectDB=require('./config/db');
const resumeRoutes = require("./routes/resumeRoutes");
const authRoutes=require("./routes/authRoutes");

const app=express();
connectDB();

//middleware-1
app.use(cors({
  origin: "https://ai-resume-analyzer-wheat-rho.vercel.app",
  credentials: true
}));
//middleware-2
app.use(express.json());
console.log(resumeRoutes);

app.use("/api/auth",authRoutes);
app.use("/api/resume", resumeRoutes);

//first api
app.get("/",(req,res)=>{
    res.send("all good!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});