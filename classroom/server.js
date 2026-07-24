const express = require("express");
const app = express();
const posts = require("./routes/post.js");
const users = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate"); //includes + partial

app.engine("ejs", ejsMate);
app.set("view engine","ejs");
 
//const cookieParser = require("cookie-parser");

const sessionOptions = {
    secret: "mysoopersecretstring", resave : false, saveUninitialized:true
}


app.use(session(sessionOptions));
app.use(flash());


app.get("/test",(req,res)=>{
    res.send("test successfull!")
})


app.get("/register",(req,res)=>{
        let{name="anonymous"} = req.query;
        req.session.name = name;

        if(name==="anonymous"){
            req.flash("error","user not registered");
        }else{
            req.flash("success","user registered successfully");
        }

        res.redirect("/hello");
})


app.get("/hello",(req,res)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.render("page.ejs",{name: req.session.name});
})




// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++; 
//     }else{
//         req.session.count = 1
//     }
//     res.send(`you sent a request ${req.session.count} times`)
// })


// app.use(cookieParser("secretCode"));

// app.get("/setcookie",(req,res)=>{
//     res.cookie("favorite", "Chocolate Chip");
//     res.send("Enjoyyy sweet tooth!!! 🍪");
// });

// app.get("/greet",(req,res)=>{
//     let{name="anonymous"} = req.cookies;
//     res.send(`Hi,${name}`);
// })

// app.get("/getsignedcookies",(req,res)=>{
//     res.cookie("made-id","india",{signed:true});
//     res.send("signed cookie sent");
// })

// app.use("/post",posts);

// app.use("/users",users);

// app.get("/getcookie",(req,res)=>{
//     res.cookie("greet","enjoy yum cookies!");
//     res.cookie("madeIn","India");
//     res.send("want more cookies?")
// });

// app.get("/",(req,res)=>{
//     res.send("Hi i am root!");
//     console.dir(req.cookies);
// });

app.listen(3000, ()=>{
    console.log("server is listning to 3000")
}) 