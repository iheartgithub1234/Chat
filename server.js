const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from public directory
app.use(express.static('public'));

// Socket.io connection handler
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle chat message event
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast to all clients
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});