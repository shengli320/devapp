'use strict';

var wsServer = require('ws').Server;
var dualStackServer = require('http').createServer();
var app = require('./http-server');

const PORT = 8080;

// create WebSocket server on top of a regular http server
var wss = new wsServer({server: dualStackServer});

// Also mount the app here
dualStackServer.on('request', app);

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: ', message);
        ws.send(JSON.stringify({answer: 32}));
    });
});

dualStackServer.listen(PORT);
console.log('http/ws server listening on port: ' + PORT);
