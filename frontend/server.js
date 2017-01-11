var express = require("express");
var app = express();
var path = require('path');

var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

var port = process.env.PORT || 80;


var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.crt', 'utf8');
var ca = fs.readFileSync('ca.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate, ca: ca, requestCert: true, rejectUnauthorized: false};

// serves all nested static files
app.use(express.static("public/src/app"));
app.use(express.static("public"));

var backendApi = 'http://www.theexcursioner.com:3000';
var frontendApi = 'http://www.theexcursioner.com/'

app.all("/api/*", function(req, res) {
    console.log("New request to backend");
    req.url = '/' + req.url.split('/').slice(2).join('/'); // remove the '/api' part
    apiProxy.web(req, res, {target: backendApi});
});

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

app.get('/', function(req,res) {
    res.send('hello');
});

var httpsServer = https.createServer(credentials, app);
var httpServer = http.createServer(app);

httpsServer.listen(443, function(err){
    console.log("running server over https port "+ 443);
});

httpServer.listen(80, function(err){
    console.log("running server over http on port "+ 80);
});
