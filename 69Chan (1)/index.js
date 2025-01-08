const socket = new WebSocket('ws://localhost:42069');

socket.addEventListener('open', function () {
    console.log('WebSocket connection established');
});

socket.addEventListener('close', function () {
    console.log('WebSocket connection closed');
});

socket.addEventListener('message', function (event) {
    console.log('Message received from server:', event.data);  // Log received messages
    const messageElement = document.createElement('div');
    messageElement.textContent = event.data;
    document.getElementById('messages').appendChild(messageElement);
});

function sendMessage() {
    const message = document.getElementById('message-input').value.trim();
    if (message) {
        socket.send(message);
        document.getElementById('message-input').value = ''; // Clear the input field
    }
}