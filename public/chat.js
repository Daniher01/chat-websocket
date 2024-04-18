const socket = io() // aqui se coloca el dominio si el websocket esta en otro servidor

// DOM Elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', () => {
    sendMessage();
})

message.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        sendMessage();
    }
})

function sendMessage(){
    data = {
        username: username.value,
        message: message.value
    };
    socket.emit('chat:message', data)
    message.value = ""
}

message.addEventListener('keypress', (e) => {
    socket.emit('chat:typing', username.value)
})

socket.on('chat:message', (data) => {
    actions.innerHTML = "";
    output.innerHTML += `
    <p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
})

socket.on('chat:typing', (data) => {
    actions.innerHTML = `
    <p> 
    <em>${data} está escribiendo</em>
    </p>`
})