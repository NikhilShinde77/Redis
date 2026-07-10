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

const PORT=process.env.PORT || 8090;
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})
