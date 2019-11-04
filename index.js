var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.send('<h1>backend active.</h1>');
});

io.on('connection', (socket) => {
    console.log("A user connected!!");
    socket
    .on('disconnect', () => {
        console.log('a user disconnected');
    })
    .on('sendChat', (chat) => {
        socket.broadcast.emit('receiveChat', chat);
    })
})

http.listen(port, () => {
    console.log('Listening on port: ', port);
});
