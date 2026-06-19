import express from 'express';
import Redis from 'ioredis';

const app=express();
app.use(express.json());
const redis=new Redis(process.env.REDIS_URL|| "redis://localhost:6379");
const QUEUE_NAME="queue:emails";
app.post("/emails",async(req,resp)=>{
 const job={
          to: req.body.to,
          subject: req.body.subject|| "No subject",
          body: req.body.body || "No body",
          createdAt:new Date().toISOString()
        }
        await redis.rpush(QUEUE_NAME,JSON.stringify(job));
        resp.json({q:true, job});

});
app.get("/emails/process-one",async(req,resp)=>{
  const rowjob=await redis.lpop(QUEUE_NAME);
  if(!rowjob){
    return resp.json({message:"No jobs in the queue"});

  }
  const job=JSON.parse(rowjob);
  resp.json({message:"email processed",job});
});
app.listen(3000,()=>{
  console.log("Server is running on port 3000");
});

