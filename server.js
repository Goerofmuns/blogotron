// umm, node?
var express = require('express');
var fs = require('fs');
var path = require('path');
var md = require('markdown').markdown;

// happy config
var app = express();
var port = process.env.PORT || 8080;

// kill me
function applyHeaderAndStyle(body)
{
    var postTitle = "Title";
    var styleSheet = "css/style.css";
    return(
            `<html>
                <head>
                    <title>${postTitle}</title>
                    <link href=\"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/journal/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-r/qnS4YZBLuBSKeVc+sM4eUYUiJMFhkHfx1nwlErHhTd+NgeJlN/NiiTd6jbKJzm\" crossorigin=\"anonymous\">
                    <link rel=\"stylesheet\" href=\"${styleSheet}\"/>
                </head>
                <body>
                    <div class="container">
                        <div class="jumbotron">
                            ${body}
                        </div>
                    </div>
                </body>
             </html>`);

}

// happy config
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// happy routes
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/:post', function(req, res) {
    var filePath = path.join(__dirname, 'posts', (req.params.post + '.md'));
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
