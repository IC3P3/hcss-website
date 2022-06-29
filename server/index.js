const dotenv = require('dotenv').config();
const http = require('http');
const express = require('express');
const socketio =  require('socket.io');
const nodemailer = require('nodemainer');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = dotenv.parsed.SERVER_PORT;
const smtpServer = dotenv.parsed.SMTP_SERVER_URL;
const smptServerPort = dotenv.parsed.SMTP_SERVER_PORT;
const smtpUsername = dotenv.parsed.SMTP_USERNAME;

const transporter = nodemailer.createTransporter({
    host: smtpServer,
    port: smptServerPort,
    secure: smptServerPort === 465,
    auth: {
        user
    }
});

server.on('error', err => {
    console.error("[Mail Sent Server] A server error has occurred: " + err);
});

server.on('close', () => {
    console.log("[Mail Sent Server] Server has been closed.")
});

server.listen(port, () => {
    console.log("[Mail Sent Server] The Server is now listening to port " + port);
});