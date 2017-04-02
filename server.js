var express = require('express'),
    hosts = require('./hosts'),
    path = require("path");

var app = express();

app.use(express.static(__dirname + '/public'));


app.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/download/request', hosts.allHosts);

app.listen(3000);
console.log('Listening on port 3000...');

