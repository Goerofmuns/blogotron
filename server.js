var express = require('express');
var fs = require('fs');
var path = require('path');
var md = require('markdown').markdown;
var app = express();

var port = process.env.PORT || 8080;

function applyHeaderAndStyle(body)
{
    var postTitle = "Title";
    var styleSheet = "css/style.css";
    return(
            `<html>
                <head>
                <title>` + postTitle + `</title>
                <link href=\"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/journal/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-r/qnS4YZBLuBSKeVc+sM4eUYUiJMFhkHfx1nwlErHhTd+NgeJlN/NiiTd6jbKJzm\" crossorigin=\"anonymous\">
                <link rel=\"stylesheet\" href=\"` + styleSheet + `\"/>
                </head>
                <body>` + body + `</body>
             </html>`);

}

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/:post', function(req, res) {
    var filePath = path.join(__dirname, 'posts', (req.params.post + '.md'));
    console.log(filePath);
    fs.readFile(filePath, {encoding: 'utf8'}, function(err, data) {
        if (err) {
            console.log("couldnt read post, error: " + err);
        }

        res.send(applyHeaderAndStyle(md.toHTML(data)));
    });
});

app.listen(port, function () {
    console.log('Webscale app is running on port ' + port);
});
