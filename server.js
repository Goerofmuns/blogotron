// includes
var express = require('express');
var fs = require('fs');
var path = require('path');
var md = require('markdown').markdown;

// Config Vars
const postDir = String(fs.readdirSync('./posts'));
const cssUrl    = "/css/style.css";

// Setup
var app = express();
var port = process.env.PORT || 8080; // Set either 8080, or respect Heroku's choice
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// happy routes
app.get('/', function(req, res) {
    res.redirect('/posts/about');
});

app.get('/posts/:postid', function(req, res) {
    var filePath = path.join(__dirname, 'posts', (req.params.postid + '.md'));
    var posts = postDir.split(",");
    fs.readFile(filePath, {encoding: 'utf8'}, function(err, data) {
        if (err) {
            console.log("couldnt read post, error: " + err);
        }

        res.render('post', {postTitle: req.params.postid,
			    styleSheet: cssUrl,
			    body: md.toHTML(data),
			    postList: posts});
    });
});

app.listen(port, function () {
    console.log('Webscale app is running on port ' + port);
});
