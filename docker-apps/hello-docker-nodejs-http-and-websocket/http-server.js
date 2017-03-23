'use strict';

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

// Constants
const PORT = 8080;

// App
var app = express();
app.use(bodyParser.json());

// create the regular HTTP request request and response
app.get('/', function (req, res) {
    console.log('Get index');
    fs.createReadStream('./index.html').pipe(res);
});

app.post('/', function (req, res) {
    var message = req.body.message;
    console.log('Regular POST message: ' + message);
    return res.json({answer: 42});
})

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
