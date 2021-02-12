var express = require('express');
var bodyParser = require("body-parser");
var cors=require("cors");
var app = express();
app.use(cors());
app.use(bodyParser.json());

totalPoints={};
distributedPoints=[];

app.post('/addPoints', (req, res)=>{
    record=req.body;
    //var found=false;
    distributedPoints.push(record);
        /* totalPoints.forEach(u => 
            {
                if(u.payer==record.payer)
                {
                    u.points+=record.points;
                    found=true;
                }
            }); */

        if(totalPoints[record.payer])
        {
            totalPoints[record.payer]+=record.points;
        }
        else
        {
            totalPoints[record.payer]=record.points;
        }

       /*  if(found==false)
        {
            totalPoints.push(record);
        } */

    console.log(totalPoints);
    console.log(distributedPoints);
    res.send(totalPoints);  
});


app.get('/getPoints',(req,res)=>{
    res.send(totalPoints);
});

app.listen(3000);