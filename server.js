var express = require('express'),
    hosts = require('./hosts'),
    path = require("path"),
    favicon = require('serve-favicon');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))

app.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/download/request', hosts.allHosts);

app.listen(3000);
console.log('Listening on port 3000...');

