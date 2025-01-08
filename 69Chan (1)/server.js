const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// Store the last 10 messages
const messages = [];

// Create an HTTP server to serve the HTML file
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve the HTML file when the root is requested
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading the HTML file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// Create the WebSocket server and bind it to the HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('A new client connected');

    // Send the last 10 messages to the new client
    messages.forEach((message) => {
        ws.send(message);
    });

    // Listen for messages from the client
    ws.on('message', (message) => {
        console.log('Received:', message);

        // Add the new message to the messages array
        messages.push(message);

        // Ensure only the last 10 messages are stored
        if (messages.length > 10) {
            messages.shift();  // Remove the oldest message if there are more than 10
        }

        // Broadcast the message to all connected clients (including the sender)
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('A client disconnected');
    });
});

// Start the server on port 42069
server.listen(42069, () => {
    console.log('Server is running on http://localhost:42069');
});
