const express=require("express")
const {userModel}=require("../model/User.model")
const {noteModel}=require("../model/Note.model")
const noteRouter=express.Router();



noteRouter.get("/",async(req,res)=>{
    const data=await noteModel.find()
    try{
        res.send(data)
    }catch(err){
        console.log(err);
        res.send({"err":err.message,"maasg":"data not showing"})
    }
    
})


noteRouter.post("/create", async (req,res)=>{
    const payload=req.body
    const new_note=new noteModel(payload)
    await new_note.save()
    res.send({"msg":"Note Created"})
    })

    
noteRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id
    try{
        const note=await noteModel.findByIdAndDelete({_id:ID})
        res.send("Note has been deleted")
    }catch(err){
        console.log(err);
        res.send({"err":err.message})
    }
    
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const ID=req.params.id
    const payload=req.body
    const note=await noteModel.findOne({"_id":ID})
    const userID_in_note=note.userID;
    const userID_on_request=req.body.userID
    try{
        if(userID_in_note!== userID_on_request){
            res.send({"msg":"you are not authorised"})
        }else{
            await noteModel.findByIdAndUpdate({"_id":ID},payload)
            res.send({"msg":"update the note"})
        }
        res.send("Note has been deleted")
    }catch(err){
        console.log(err);
        res.send({"err":err.message})
    }
    
})

module.exports={noteRouter}
