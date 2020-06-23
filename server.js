var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var http = require('http'),
    https = require('https'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    querystring = require('querystring'),
    cookieParser = require('cookie-parser'),
    multer = require('multer'),
    session = require('express-session'),
    fs = require('fs'),
    crypto = require('crypto');

var db = require('./db/mongoose-data').db;

var app_host, app_port;

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/assets/css'));
app.use(express.static(__dirname + '/assets/img'));
app.use(express.static(__dirname + '/assets/vendor'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(errorhandler());

app.use(multer({ dest: '../uploads/'}).single('fileToUpload'));
router.get("/login",function(req,res){
  res.sendFile(path + "login.html");
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/home",function(req,res){
  res.sendFile(path + "home.html");
});

router.get("/models",function(req,res){
  res.sendFile(path + "tileModels.html");
});

router.get("/productionLog",function(req,res){
  res.sendFile(path + "productionLog.html");
});

router.get("/enquririe",function(req,res){
  res.sendFile(path + "enquririe.html");
});

router.get("/sales",function(req,res){
  res.sendFile(path + "sales.html");
});
app.use("/",router);


var routes = require('./apis/routes');
routes(app);

if (app.get('env') === 'development') {
    // set app defaults for local
    app_host = process.env.HOST || 'localhost';
    app_port = process.env.PORT || 3000;    
} else {
    //set app defaults for heroku
    app_host = process.env.HOST;
    app_port = process.env.PORT;
}

app.listen(app_port,function(){
  console.log(app.settings.env + ';__dirname:' + __dirname + ';');
  console.log('SSRCP Server started @Port : ' + this.address().port);
});