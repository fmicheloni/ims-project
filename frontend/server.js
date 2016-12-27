var express = require("express");
var app = express();
var path = require('path');

var port = process.env.PORT || 80;

// serves all nested static files
app.use(express.static("public/src/app"));
app.use(express.static("public"));

app.use(function(req, res, next){
    res.status(404);

    // // respond with html page
    if (req.accepts('html')) {
        // res.sendFile('static/404.html', { url: req.url });
        res.sendFile(path.join(__dirname + '/static/404.html'));
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

app.listen(port, function(err){
    console.log("running server on port "+ port);
});