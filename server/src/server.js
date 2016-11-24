const allowed = ["http://localhost:3001", "http://localhost:8080"];

const express = require("express");
const app = express();

const path = require("path");
console.log("path.resolve: ", path.resolve("client/public"));
app.use(express.static(path.resolve("client/public")));

app.all("*", (req, res, next)=>{
    if (allowed.includes(req.headers.origin)){
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    res.header("Access-Control-Allow-Methods", "GET,POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/get", (req, res)=>{
    console.log("GOTTEN!");
    res.send("OK");
});

app.post("/create", (req, res)=>{
    res.send("OK");
});

app.listen(3001, ()=>{
    console.log("CRUD book server started on localhost:3001");
});
