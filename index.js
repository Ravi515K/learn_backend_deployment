const express=require("express");
require('dotenv').config();
 const {connection} = require("./db")
 const cors=require("cors")
const {userRouter}=require("./Routes/User.routes")
const {noteRouter}=require("./Routes/Note.routes")
const {authenticate}=require("./middlewares/auth.middleware")
const app=express();

app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRouter)

app.use(authenticate)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connect to DB")
    }catch(err){
        console.log(err);
        console.log("connection failed to DB")
    }
    console.log(`Localhost running on port ${process.env.port}`)
})