const express = require("express");
const app = express();
const posts = require("./routes/post.js");
const users = require("./routes/user.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretCode"));

app.get("/setcookie",(req,res)=>{
    res.cookie("favorite", "Chocolate Chip");
    res.send("Enjoyyy sweet tooth!!! 🍪");
});

app.get("/greet",(req,res)=>{
    let{name="anonymous"} = req.cookies;
    res.send(`Hi,${name}`);
})

app.get("/getsignedcookies",(req,res)=>{
    res.cookie("made-id","india",{signed:true});
    res.send("signed cookie sent");
})

app.use("/post",posts);

app.use("/users",users);

app.get("/getcookie",(req,res)=>{
    res.cookie("greet","enjoy yum cookies!");
    res.cookie("madeIn","India");
    res.send("want more cookies?")
});

app.get("/",(req,res)=>{
    res.send("Hi i am root!");
    console.dir(req.cookies);
});

app.listen(3000, ()=>{
    console.log("server is listning to 3000")
})