const dotenv = require('dotenv').config();
const http = require('http');
const express = require('express');
const socketio =  require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

