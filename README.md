# Assessment for the Backend Software Engineer role - Fetch Rewards

### I have used Node.js and Express.js to build the code

### Instructions on how to run the code

#### execute `node --version` on your terminal or command prompt to check if Node.js is installed in your machine
#### If Node is already installed in your machine, you should be able to see the version using the above method. If you see an error, install Node.js by following the instructions on [https://nodejs.org/en/](https://nodejs.org/en/). I have used v14.15.1 of Node to code.


### execute `npm install` to install all the dependency packages

### Packages used for building and debugging purposes are listed below

"body-parser": https://www.npmjs.com/package/body-parser
"cors": https://www.npmjs.com/package/cors
"express": https://www.npmjs.com/package/express
"moment": https://www.npmjs.com/package/moment
"nodemon": https://www.npmjs.com/package/nodemon

## APIs built and their outputs
### /addPoints API - Post request with JSON body

Feed in one JSON object as the body of the request
Sample input as mentioned in the example is listed below

{
	"payer":"DANNON",
	"points":300,
	"time":"10/31/2020 10:00 AM"
}

{
	"payer":"UNILEVER",
	"points":200,
	"time":"10/31/2020 11:00 AM"
}

{
	"payer":"DANNON",
	"points":-200,
	"time":"10/31/2020 3:00 PM"
}

{
	"payer":"MILLER COORS",
	"points":10000,
	"time":"11/1/2020 2:00 PM"
}

{
	"payer":"DANNON",
	"points":1000,
	"time":"11/2/2020 2:00 PM"
}

This adds the points with the payer and the time stamps, the output screens are attached below,
<img height="100%" width="100%" src="/Screenshots/addPoints1.png"/>
<br/>
<img height="100%" width="100%" src="/Screenshots/addPoints2.png"/>
<br/>
<img height="100%" width="100%" src="/Screenshots/addPoints3.png"/>
<br/>
<img height="100%" width="100%" src="/Screenshots/addPoints3.png"/>
<br/>
<img height="100%" width="100%" src="/Screenshots/addPoints4.png"/>
<br/>
<img height="100%" width="100%" src="/Screenshots/addPoints5.png"/>
<br/>

### /deductPoints API - Post request with JSON body

### /getPoints API - get request