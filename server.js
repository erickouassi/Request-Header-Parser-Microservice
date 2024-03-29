// server.js
// where your node app starts
'use strict';

// init project
var express = require('express');
var app = express();
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/whoami", function (req, res) {

     var host = req.headers
     var ipaddress = (host['x-forwarded-for']||req.socket.remoteAddress).split(",")[0];
     var language = host['accept-language'].split(",")[0];
     var software = host['user-agent'].split('(')[1].split(')')[0]
   
     var hostResult = {"IP Address":ipaddress,"Language":language,
	                   "Software":software}
// Indent with space add "null,X"
     res.end(JSON.stringify(hostResult, null,1))

});

// 404 Not Found 
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found\nPlease type \"/api/whoami\" on the tail end of the url.');
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
