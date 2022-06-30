const socket = io('http://localhost:3000', {
    transports : ['websocket']
});

function sendContactInformation(name, email, message) {
    socket.emit('sendContact', name, email, message);
    alert("Die Kontaktanfrage wurde gesendet.");
}