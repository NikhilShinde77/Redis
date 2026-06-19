import express from "express";
import { emailQueue } from "./queue.js";


const app=express();

app.use(express.json());

app.post("/email",(req,resp)=>{
  const job = emailQueue.add("sendEmail",
    {
      to:req.body.to,
      name:req.body.name|| Leaner,

    },
    {
      attempts:3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },

    }
  );
  resp.json({message:"Email job added to queue",jobId:job.id});
});
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})