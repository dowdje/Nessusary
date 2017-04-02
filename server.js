var express = require('express'),
    hosts = require('./hosts');

var app = express();

app.get('/download/request', hosts.allHosts);


app.listen(3000);
console.log('Listening on port 3000...');

