const mongoose=require("mongoose");

require('dotenv').config();
//mongoose.set('strictQuery', false);
const connection=mongoose.connect(process.env.url)

module.exports={connection}

// (err,db) => {

//     if(err){
//        console.log(`Database not connected :   ${err}`)
//     }else{
//        console.log('Database connected Successfully')
//     }
//     })