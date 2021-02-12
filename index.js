var express = require('express');
var bodyParser = require("body-parser");
var cors=require("cors");
var moment=require("moment");
var app = express();
app.use(cors());
app.use(bodyParser.json());

totalPoints={};
distributedPoints=[];

app.post('/deductPoints',(req,res)=>{
    //Algorithm is expected to 
    //1) Remove points that were added in first
    //2) No negative points for payers
    var sum=0;
    var reqpoints=req.body.points;
    for(var val in totalPoints)
    {
        sum+=totalPoints[val];
    }

    if(sum<reqpoints)
    {
        res.send({"Message":"Available points is lesser than the deduction request"});
    }

    else
    {
        tempPoints=reqpoints;
        remainingPoints=reqpoints;
        deductedPoints={};

        distributedPoints= distributedPoints.sort((a,b)=> { return new Date(b.time) - new Date(a.time) });
        var ptr=0,ptr2=0;
        modifiedDistributedPoints=distributedPoints;

        while(remainingPoints>0)
        {
            currentPayer=distributedPoints[ptr];
            currentDeduction=0;

            if(deductedPoints[currentPayer["points"]]-remainingPoints>=0)
            {
                currentDeduction=currentPayer["points"]-remainingPoints;
                console.log("So the remaining was not a -ve so... "+currentDeduction);
            }

            else
            {
                currentDeduction=currentPayer["points"];
                console.log("So the thing was lesser so, ..."+currentDeduction);
                modifiedDistributedPoints.splice(ptr2,1);
                ptr2--;
            }
            
            remainingPoints-=currentDeduction;
            console.log("remainingPoints = ",remainingPoints);
            currentDeduction*=-1;
            //remainingPoints=reqpoints-tempPoints;
            if(deductedPoints[currentPayer["payer"]])
                deductedPoints[currentPayer["payer"]]-=currentDeduction;
            else
                deductedPoints[currentPayer["payer"]]=currentDeduction;
            ptr++;
            ptr2++;
            
            if(remainingPoints<=0)
            {
                distributedPoints=modifiedDistributedPoints;
                for(var i in totalPoints)
                {
                    if(deductedPoints[i])
                        totalPoints[i]+=deductedPoints[i];
                }
                res.send(deductedPoints);
                console.log(distributedPoints);
                console.log(totalPoints);
            }
        }        
    }

});

app.post('/addPoints', (req, res)=>{
    record=req.body;
    record.time=moment(record.time,"MM/DD/YYYY h:m a").toDate();

    //console.log(record.time);
    //var found=false;
    if(record.points>=0)
        distributedPoints.push(record);
    else
    {
        distributedPoints= distributedPoints.sort((a,b)=> { return new Date(b.time) - new Date(a.time) });
        var updated=false;
        var ptr=0;
        while(updated==false || ptr<distributedPoints.length)
        {
            console.log("ptr thing here --- "+distributedPoints[ptr]);
            if(distributedPoints[ptr]["payer"]==record.payer)
            {
                distributedPoints[ptr]["points"]+=record.points;
                distributedPoints[ptr]["time"]=record.time;
                updated=true;
                ptr++;
            }
        }
    }
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
    console.log(distributedPoints);
    res.send(totalPoints);  
});


app.get('/getPoints',(req,res)=>{
    res.send(totalPoints);
});

app.listen(3000);