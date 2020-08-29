const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require('cors');

const usersRoute = require("./routes/user");

app.use(express.json());
app.use(cors());
app.use("/api/users", usersRoute);

const http = require('http').createServer(app);
const io = require('socket.io')(http);

mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB...", err));

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
