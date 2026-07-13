const express = require("express");
const app = express();
const posts = require("./routes/post.js");
const users = require("./routes/user.js");

app.use("/post",posts);

app.use("/users",users);


app.get("/",(req,res)=>{
    res.send("Hi i am root!");
});

app.listen(3000, ()=>{
    console.log("server is listning to 3000")
})