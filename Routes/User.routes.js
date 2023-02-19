const express=require("express")
const {userModel}=require("../model/User.model")
const userRouter=express.Router();
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

userRouter.get("/",async(req,res)=>{
    const data=await userModel.find()
    try{
        res.send(data)
    }catch(err){
        console.log(err);
        res.send({"err":err.message,"maasg":"data not showing"})
    }
    
})


userRouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body
    try{
        bcrypt.hash(pass, 5, async(err, hash) =>{
            // Store hash in your password DB.
            if(err){
                es.send({"err":err.message,"msg":"user unable to registered"})
            }else{
                const user=new userModel({name,email,pass:hash})
                    await user.save()
                    res.send({"msg":"New user has been registered"})
            }
        })
        
    }catch(err){
        console.log(err)
        res.send({"err":err.message,"msg":"user unable to registered"})
    }
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
        let token=jwt.sign({course:"backend"},"masai")
        const user=await userModel.find({email})
        bcrypt.compare(pass, user[0].pass, (err, result)=> {
            // result == true
            if(result){
                if(user.length>0){
                    res.send({"msg":"logged in","token":token})
                   }else{
                    res.send("wrong credential")
                   }
            }
        })
    }catch(err){
        console.log(err);
        res.send({"err":err.message,"msg":"Something went wrong"})
    }
    
})

module.exports={userRouter}