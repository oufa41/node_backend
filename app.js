var express = require('express');
var bodyParser = require("body-parser");
var request = require('request');
var http = require('http');
var cors = require("cors");
var app = express();
var url_country = 'http://127.0.0.1:8080/countries';

app.set('port', 8000);
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
app.use(cors());
app.use(bodyParser.urlencoded({
		extended: false
		}));

app.get('/countries', function(req, res, next) {
 
 request({
    url: url_country,
    json: true
 }, function (err, response,body) {
  if (err) return console.error(err.message);
    console.log(body);
    res.send(body);
 });
   
});


var url_airports = 'http://127.0.0.1:8080/airports';
app.get('/airports', function(req, res, next) {
 
 request({
    url: url_airports,
    json: true
 }, function (err, response,body) {
  if (err) return console.error(err.message);
  
    var stringified = JSON.stringify(body);
    var parsedObj = JSON.parse(stringified);
	var result = [];
	for (var i = 0; i < parsedObj.length; i++) {
	       result.push({name: parsedObj[i].name, iso_country: parsedObj[i].iso_country})
	}
	//res.contentType('application/json');
	console.log(JSON.stringify(result));
    res.send(JSON.stringify(result));

   
 });
   
});










