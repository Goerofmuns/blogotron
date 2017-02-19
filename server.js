// includes
var express = require('express');
var fs = require('fs');
var path = require('path');
var md = require('markdown').markdown;
var bodyParser = require('body-parser');

// Config Vars
var postDir = String(fs.readdirSync('./posts'));
const cssUrl    = "/css/style.css";

function reloadPosts()
{
    postDir = String(fs.readdirSync('./posts'));
}

// Setup
var app = express();
var port = process.env.PORT || 8080; // Set either 8080, or respect Heroku's choice
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// happy routes
app.get('/', function(req, res) {
    res.redirect('/posts/about');
});

app.post('/create', function(req, res) {
    var title  = req.body.title;
    var mdbody = req.body.mdbody;
    var pass   = req.body.password || ef28f869b241b00b879922832b14da10;
    if(pass != process.env.PASSWORD)
    {
        res.redirect('/');
        return;
    }
    fs.stat('./posts/' + title + '.md', function (err, stats) {
        if(stats)
        {
            res.redirect('/');
            return;
        } else {
            fs.writeFileSync('./posts/' + title + '.md', mdbody, {flag: 'w'});
            reloadPosts();
            res.redirect('/posts/' + title);
        }
    });
});

app.get('/write', function(req, res) {
    var posts = postDir.split(",");
    res.render('write', {styleSheet: cssUrl,
			 postList: posts});
});

app.get('/posts/:postid', function(req, res) {
    var filePath = path.join(__dirname, 'posts', (req.params.postid + '.md'));
    var posts = postDir.split(",");
    fs.readFile(filePath, {encoding: 'utf8'}, function(err, data) {
        if (err) {
            console.log("couldnt read post, error: " + err);
            res.redirect('/posts/error');
            return;
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
