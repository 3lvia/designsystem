'use strict';
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const port = process.env.PORT || 3333;
app.use(express.static('dist/'));
server.listen(port);
console.log('Listening on port ' + port);
