const express = require("express");
const router = express.Router();


//users
//Index
router.get("/",(req,res)=>{
    res.send("get for users");
})

//Show
router.get("/:id",(req,res)=>{
    res.send("get for show users");
})

//POST
router.post("/",(req,res)=>{
    res.send("post for users");
})
 
//DELETE
router.post("/",(req,res)=>{
    res.send("Delete for user id");
})

module.exports=router;