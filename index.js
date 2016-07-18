var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.get('/', function(res, req) {
    res.send("<h1>Hello World</h1>");
});

app.listen(port, function () {

});
