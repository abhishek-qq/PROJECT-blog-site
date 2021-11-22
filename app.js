const express = require ("express");
const app = express();
const mongoose = require("mongoose")
const ejs = require("ejs");
const _ = require("lodash");

const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/newsBlog", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String,
  category: String
};

const Nblog = mongoose.model("Nblog", postSchema);



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/page.html")

})

// route responsible for rendering composed blogs

app.get("/Blogs", function(req, res){

    Nblog.find({}, function(err, Nblogs){
        
      res.render("Blogs", {
        posts: Nblogs
        
        });

    });
  });










// compose route

app.get("/compose", function (req, res) {
    res.render("Compose");
})
app.get("/signup", function (req, res) {
    res.render("signup");
})

// post request from the compose form we have created

app.post("/compose", function(req, res){
    


            const blog = new Nblog({
                
                title: req.body.postTitle,
                content: req.body.postBody,
                category :req.body.catName
              });
            
            
              blog.save(function(err){
                if (!err){
                    res.redirect("/Blogs");
                }
              });
        

    
    
  });


//   user database

const userSchema = {
    name : String,
    number: Number,
    email: String
  };
  
  const uList = mongoose.model("uList", userSchema);


app.post("/signup", function(req, res){
    


    const user = new uList({
        name: req.body.userName,
        number: req.body.cNumber,
        email:req.body.cEmail
      });
    
    
      user.save(function(err){
        if (!err){
            res.redirect("/");
        }
      });




});
// route to render the user list or reader list 
app.get("/userlist", function(req, res){

    uList.find({}, function(err, uLists){
        
      res.render("Users", {
        posts: uLists
        
        });

    });
  }); 



app.listen(3030, function () {
    console.log("server satrted on port number 3000")
})