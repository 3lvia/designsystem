'use strict'
const express = require('express');
const app = express();
const server = require('http').createServer(app);


const port = process.env.PORT || 3333;
app.use(express.static('dist/'));
app.use("/css/elvis.min.css", express.static(__dirname + '/../css/elvis.min.css'));
app.use("/elvis.js", express.static(__dirname + '/../elvis.js'));
server.listen(port);
console.log('Listening on port ' + port);