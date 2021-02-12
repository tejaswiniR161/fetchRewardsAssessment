var express = require('express');
var bodyParser = require("body-parser");
var cors=require("cors");
var app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/addPoints', function(req, res){
   res.send("Hello! Let's build this API!");
});

app.listen(3000);