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
        distributedPoints= distributedPoints.sort((a,b)=> { return new Date(a.time) - new Date(b.time) });
        remaining=reqpoints;
        deductedJSON={};
        for(var i=0;i<distributedPoints.length;i++)
        {
            var deducted=0;
            cp=distributedPoints[i];
            if(cp.points-remaining>=0)
            {
                deducted=remaining;
                console.log("the deducted thing = "+deducted);
                distributedPoints[i].points-=deducted;
            }
            else
            {
                deducted=cp.points;
                distributedPoints[i].points=0;
            }
            deducted*=parseInt(-1);
            remaining+=deducted;
            if(deductedJSON[cp.payer])
                deductedJSON[cp.payer]+=deducted;
            else
                deductedJSON[cp.payer]=deducted;

            if(remaining<=0)
            {
                console.dir(distributedPoints, { depth: null });
                console.log("remaining logs = "+distributedPoints);
                totalPoints={};
                for(var j=0;j<distributedPoints.length;j++)
                {
                    if(distributedPoints[j].points==0)
                    {
                        distributedPoints.splice(j,1);
                        j--;
                    }
                    else
                    {
                        if(totalPoints[distributedPoints[j].payer])
                            totalPoints[distributedPoints[j].payer]+=distributedPoints[j].points;
                        else
                            totalPoints[distributedPoints[j].payer]=distributedPoints[j].points;
                    }
                }
                console.dir(distributedPoints, { depth: null });
                res.send(deductedJSON);
                break;
            }

        }
    }

});

app.post('/addPoints', (req, res)=>{
    record=req.body;
    record.time=moment(record.time,"MM/DD/YYYY h:m a").toDate();

    //console.log(record.time);
    //var found=false;
    
    //if(record.points>=0)
    distributedPoints.push(record);
    /* else
    {
        distributedPoints= distributedPoints.sort((a,b)=> { return new Date(b.time) - new Date(a.time) });
        var updated=false;
        var ptr=0;
        while(updated==false && ptr<distributedPoints.length)
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
    } */
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