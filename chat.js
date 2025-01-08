// Create a WebSocket connection to the server
const socket = new WebSocket('ws://localhost:42069');  // Change to your server address

// Get DOM elements
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');

// Function to send a message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        console.log('Sending message:', message);  // Log message being sent
        socket.send(message);  // Send message through WebSocket
        messageInput.value = '';  // Clear the input field
    }
}

// Listen for messages from the server
socket.addEventListener('message', function (event) {
    console.log('Received message:', event.data);  // Log received message

    const message = event.data;  // Directly use the received data (no need for decoding)
    
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;  // Scroll to the latest message
});

// Handle connection open
socket.addEventListener('open', function () {
    console.log('Connected to WebSocket server');
});

// Handle connection close
socket.addEventListener('close', function () {
    console.log('Disconnected from WebSocket server');
});

// Handle connection errors
socket.addEventListener('error', function (error) {
    console.error('WebSocket error:', error);
});
