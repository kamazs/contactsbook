const express = require("express");
const path = require("path");
const orm = require("orm");
const qorm = require("q-orm");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const resizeCrop = require("resize-crop");
const config = require("./config.js");

const app = express();
const urlencoded = bodyParser.urlencoded({extended: false});
const jsonEncoded = bodyParser.json(); 

app.use(express.static(path.resolve("client/public")));

app.use(orm.express([ "mysql://", config.dbUser, ":", config.dbPassword, "@", config.host, "/", config.dbName ].join(""), {
        define: (db, models, next)=>{
            models.contacts = db.define("contacts", {
                name: String,
                surname: String,
                phone: String,
                email: String
            });

            next();
        }
    }
));

app.use(fileUpload());

app.all("*", (req, res, next)=>{
    if (config.allowed.includes(req.headers.origin)){
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    res.header("Access-Control-Allow-Methods", "GET,POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/get", (req, res)=>{
    console.log("TEST GET GOTTEN!");
    res.send("OK");
});

app.get("/all", urlencoded, (req, res)=>{
    req.models.contacts.find({}, (err, contacts)=>{
        res.send( JSON.stringify(contacts) );    
    });
});

app.post("/create", jsonEncoded, (req, res)=>{
    req.models.contacts.create(req.body, err=>{
        if (err) throw err;
        console.log("Contact created: ", req.body);
        res.send("OK");
    });
});

app.post("/update", jsonEncoded, (req, res)=>{
    const id = req.body.id;
    req.models.contacts.get(id, (err,contact)=>{
        contact && contact.save({
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            email: req.body.email
        }, err=>{
            !err && console.log("Updated! ");
        });
        res.send("OK");
    });
});

app.post("/delete", jsonEncoded, (req, res)=>{
    console.log("body: ", req.body);
    const id = req.body.id;
    req.models.contacts.get(id, (err, contact)=>{
        contact && contact.remove(err=>{
            !err && console.log("Deleted!");
        });
        res.send("OK");
    });
});

app.post("/upload", (req,res)=>{
    console.log("File upload attempt!");

    if (!req.files){
        res.send("No files were uploaded!");
        return;
    }
    console.log("req.files: ", req.files);

    let uploadedFile = req.files.file;
    const imgPath = path.resolve("client/public/img/");
    
    uploadedFile.mv( imgPath + req.files.file.name, err=>{
        if (err){
            console.log("ERROR UPLOADING FILE: ", err);
            res.status(500).send(err);
        } else {
            console.log("File uploaded!");
            res.send("File uploaded!");
            resizeCrop({
                format: "jpg",
                src: imgPath + req.files.file.name,
                dest: imgPath + "out/" + req.files.file.name,
                width: 100,
                height: 200,
                gravity: "center"
            }, (err,filePath)=>{
                if (console.log("ResizeCrop ERROR: ", filePath, err)){
                    res.status(500).send(err);
                    return;
                }
                console.log("Succesful resize-crop to ", filePath);
            });
        }
    });
});

app.listen(3001, ()=>{
    console.log("CRUD book server started on localhost:3001");
});
