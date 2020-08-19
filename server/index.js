const app = require('express')();
const cors = require('cors');

app.use(cors());

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('disconnect', (reason) => {
        console.log('a user disconnected', socket.id, reason);
    });

    socket.on('SEND_MESSAGE', function(data) {
        console.log(data);
        io.emit('MESSAGE', data)
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
