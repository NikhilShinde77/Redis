import express from "express";
import Redis from 'ioredis';

const app=express();
use(express.json());

const publisher = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.post("/not",async(req,resp)=>{
const payload=req.body.message;
await publisher.publish("not",payload);
resp.json({message:"Notification sent"});
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
