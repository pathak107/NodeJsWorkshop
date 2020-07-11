//Importing modules
const express= require('express');
const bodyParser=require('body-parser');

const app= express(); // initialising object of express

//Using body parser
app.use(bodyParser.urlencoded({extended:true}));

//For sending css,js,images and any other static files along with html
//telling express to look for statics file in 'public' folder
app.use(express.static('public'))

//Database
var Articles=[
    {
        id:1,
        title:"Nodejs",
        body:"Node js is an open source javascript runtime"

    },
    {
        id:2,
        title:"Flutter",
        body:"Flutter is a UI sdk for cross platformmobile development"

    },
    {
        id:3,
        title:"React",
        body:"Front end framework"

    },

]


//home route
app.get('/',function(req,res){
    res.sendFile(__dirname+"/views/index.html");
});


//articles route
app.get('/articles',function(req,res){
    res.sendFile(__dirname+"/views/articles.html");
})


//For a particular article using id passed with url parameters
app.get('/articles/:id',function(req,res){
    //extracting info from url parameters
    var article_id=req.params.id;

    //depending upon the id send different html files
    if(article_id==1){
        res.sendFile(__dirname+"/views/nodejs.html");
    }else if(article_id==2){
        res.sendFile(__dirname+"/views/flutter.html");
    }
    else if(article_id==3){
        res.sendFile(__dirname+"/views/react.html");
    }
})


//new Article page
app.get('/newArticle',function(req,res){
    res.sendFile(__dirname+"/views/newArticle.html")
})
//When someone submits a new article
app.post('/newArticle',function(req,res){
    //extracting the information send by html form
    var newArticle={
        id:Articles.length+1,
        title:req.body.title,
        body:req.body.body
    }

    //adding the new article in my database
    Articles.push(newArticle);
    console.log(Articles);

    //redirecting the client to articles route in response
    res.redirect('/articles');
})


//fuction to listen for incoming http requests
//3000 is a port which just specifies at which port the server should be listening to.
//it can be anything 3000,5000 it's your choice
app.listen(3000,function(){
    console.log("Server started at port 3000");
})