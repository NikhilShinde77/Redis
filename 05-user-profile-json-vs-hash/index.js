import express from 'express';
import Redis from 'ioredis';

const app=express();
app.use(express.json());
const redis=new Redis(process.env.REDIS_URL|| "redis://localhost:6379");

app.post('/user/:id/json',async(req,resp)=>{
  const data=await redis.set(`user:${req.params.id}`,JSON.stringify(req.body));
  resp.json({data});
});
app.get('/user/:id/json',async(req,resp)=>{
  const row=await redis.get(`user:${req.params.id}:json`);
  resp.json({user:row ? JSON.parse(row):null});
});

app.post('/user/:id/hash',async(req,resp)=>{
  await redis.hset(`user:${req.params.id}:hash`,req.body);
  resp.json({saved:"hash"});
});
app.get('/user/:id/hash',async(req,resp)=>{
  const user=await redis.hgetall(`user:${req.params.id}:hash`);
  resp.json({user});
});

app.listen(3000,()=>{
  console.log("Server is running on port 3000");
});