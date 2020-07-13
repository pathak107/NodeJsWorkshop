//Importing modules
const express= require('express');
const bodyParser=require('body-parser');
const sqlite3 = require('sqlite3').verbose()

const app= express(); // initialising object of express


//connection with database
const db = new sqlite3.Database('./Database/articles.db',function(){
    console.log("Database successfully connected")
})

//setting my view engine as ejs
app.set('view engine', 'ejs');

//Using body parser
app.use(bodyParser.urlencoded({extended:true}));

//For sending css,js,images and any other static files along with html
//telling express to look for statics file in 'public' folder
app.use(express.static('public'))


//home route
app.get('/',function(req,res){
    res.sendFile(__dirname+"/views/index.html");
});


//articles route
app.get('/articles',function(req,res){

    //Fetching all the articles from database
    db.all('select * from Articles;',function(err,rows){
        if(err) console.log(err);
        res.render('articles',{Articles:rows});
    })  
})


//For a particular article using id passed with url parameters
app.get('/articles/:id',function(req,res){
    //extracting info from url parameters
    var article_id=req.params.id;

    //Fetching the article with a particular id
    db.each('select * from Articles where id=?;',[article_id],function(err,row){
        if(err) console.log(err);
        res.render('singleArticle.ejs', {article: row})
    })
})

app.delete('/articles/:id',function(req,res){
    //extracting info from url parameters
    var article_id=req.params.id;

    //deleting the article with particular id
    db.run('delete from Articles where id=?;',[article_id],function(err){
        if(err) console.log(err);
        console.log("Deleted article");

        //sending the status in response as we can't redirect in case of delete and put requests 
        //instead we send back the status code.
        res.sendStatus(200);
    })

})


//new Article page
app.get('/newArticle',function(req,res){
    res.sendFile(__dirname+"/views/newArticle.html")
})

//When someone submits a new article
app.post('/newArticle',function(req,res){
    //extracting the information send by html form
    //using req.body.title and req.body.body
    //and inserting the data in database 
    db.run('insert into Articles(title,body) values (?,?);',[req.body.title,req.body.body],function(err){
        if(err) console.log(err);
        console.log("Inserted successfully");
    })
    //redirecting the client to articles route in response
    res.redirect('/articles');
})


//fuction to listen for incoming http requests
//3000 is a port which just specifies at which port the server should be listening to.
//it can be anything 3000,5000 it's your choice
app.listen(3000,function(){
    console.log("Server started at port 3000");
})