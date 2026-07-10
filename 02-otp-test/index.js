const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db.js');
const Redis=require('ioredis');
const redis=new Redis(process.env.Redis_URI);
const User=require("./model/userM.js");
dotenv.config();
connectDB();

const app=express();
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("start to redis first app");
})
app.use("/api",require("./router/userR.js")); 

app.post('/c',async(req,res)=>{
  await redis.del("user:all");
  const data=await User.create(req.body);
  res.json(data);
})

app.get('/redis',async(req,res)=>{
  const data=await redis.get("user:all");
  if(data){
    const user=JSON.parse(data);
   
    return res.json(user);
  
  }

    const user=await User.find({});
    await redis.set("user:all",JSON.stringify(user));
    return res.json(user);
})

app.post('/otp',async(req,res)=>{
  const {email}=req.body;
  const otp = JSON.stringify(Math.floor(1000 + Math.random() * 9000));
  await redis.set(`otp:${email}`,otp,"EX",120);
  res.json({message:`otp sent to ${email} is ${otp}`});
})
app.post('/verify', async (req, res) => {
  const {email,otp}=req.body;
  const casheotp = await redis.get(`otp:${email}`);
  if(!casheotp){
    return res.json({ message: "OTP expired or not found" });
  }

    if (casheotp === otp) {
        return res.json({ message: "OTP verified successfully" });
    }
   await redis.del(`otp:${emal}`)
    return res.json({ message: "Invalid OTP" });
});


const PORT=process.env.PORT || 8090;
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})