var hosts = [ {
  "hostname" : "nessus-ntp.lab.com",
  "name" : "host1",
  "port" : 1241,
  "username" : "toto"
}, {
  "hostname" : "nessus-xml.lab.com",
  "name" : "host2",
  "port" : 3384,
  "username" : "admin"
}, {
  "hostname" : "nessus-nogg.lab.com",
  "name" : "host3",
  "port" : 5123,
  "username" : "bevo"
}, {
  "hostname" : "nessus-bo-bessus.lab.com",
  "name" : "host4",
  "port" : 8179,
  "username" : "nogg"
} ];

exports.allHosts = function(req, res) {
  console.log(hosts.slice(0, req.query.host))
  let response = hosts.slice(0, req.query.host)
  res.header("Access-Control-Allow-Origin", "*");
    res.send(response)};