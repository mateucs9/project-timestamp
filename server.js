// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function(req, res) {
  let date;
  let unix;
  let utc;

  if (!req.params.date) {
    console.log("empty");

    date = new Date(moment(req.time));
    unix = date.getTime();
    utc = date.toUTCString();
    res.send({ unix: unix, utc: utc });
  }
  else if (!isNaN(Date.parse(req.params.date))) {
    console.log("string");
    date = new Date(req.params.date);
    unix = date.getTime();
    utc = date.toUTCString();
    res.send({ unix: unix, utc: utc });
  } else if (Number.isFinite(Number(req.params.date))) {
    console.log("number");
    console.log(req.params.date);
    date = new Date(Number(req.params.date));
    unix = date.getTime();
    utc = date.toUTCString();
    res.send({ unix: unix, utc: utc });
  } else {
    console.log("other");
    console.log(req.params.date);
    res.send({ error: "Invalid Date" });
  }



})



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
