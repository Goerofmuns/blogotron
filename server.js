// umm, node?
var express = require('express');
var fs = require('fs');
var path = require('path');
var md = require('markdown').markdown;

// happy config
var app = express();
var port = process.env.PORT || 8080;

// happy config
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// happy routes
app.get('/', function(req, res) {
    var postFiles = String(fs.readdirSync('./posts'));
    var posts = postFiles.split(",");
    res.render('index', {postList: posts});
});

app.get('/posts/:postid', function(req, res) {
    var filePath = path.join(__dirname, 'posts', (req.params.postid + '.md'));
    fs.readFile(filePath, {encoding: 'utf8'}, function(err, data) {
        if (err) {
            console.log("couldnt read post, error: " + err);
        }

        res.render('post', {postTitle: req.params.postid, styleSheet: "/css/style.css", body: md.toHTML(data)});
    });
});

app.listen(port, function () {
    console.log('Webscale app is running on port ' + port);
});
