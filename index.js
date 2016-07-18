var express = require('express');
var app = express();

app.get('/', function(res, req) {
    res.send("<h1>Hello World</h1>");
});

app.listen(80, function () {

});
