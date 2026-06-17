import express from 'express';
import Redis from 'ioredis';
const app=express();
app.use(express.json());
const redis=new Redis(process.env.REDIS_URL || "redis://localhost:6379");

function otpkey(phoneNumber){
    return `otp:${phoneNumber}`;
    
}
app.post('/otp',async(req,res)=>{
  const {phone}=req.body;
  const otp=Math.floor(100000+Math.random()*900000).toString();
  await redis.set(otpkey(phone),otp,'EX',30);
  res.json({message:"OTP sent successfully", otp});


})

app.post ("/otp/verify",async(req,res)=>{
   const {phone,otp}=req.body;
   const savedOtp=await redis.get(otpkey(phone));
    if(!savedOtp){
        return res.status(400).json({message:"OTP expired or not found"});
    }
    if(savedOtp!==otp){
        return res.status(400).json({message:"Invalid OTP"});
    }
    await redis.del(otpkey(phone));
    res.json({message:"OTP verified successfully"});
});

app.get("/otp/:phone/ttl",async(req,res)=>{
const ttl=await redis.ttl(otpkey(req.params.phone));
res.json({ttl});
});
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});