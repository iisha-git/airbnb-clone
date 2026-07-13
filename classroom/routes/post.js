const express = require("express");
const router = express.Router();


//POST
//Index
router.get("/",(req,res)=>{
    res.send("get for post");
})

//Show
router.get("/:id",(req,res)=>{
    res.send("get for show post");
})

//POST
router.post("/",(req,res)=>{
    res.send("post for posts");
})
 
//DELETE
router.post("/",(req,res)=>{
    res.send("Delete for posts id");
})

module.exports=router;