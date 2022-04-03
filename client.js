const socket = io('https://enigmatic-lake-78226.herokuapp.com');



//send-container index.html may form tag ki id hay
const form = document.getElementById('send-container');

//messageInp input ki id hay index.html k form tag may
const messageInput = document.getElementById('messageInp');

//main bhi ek id hay index.html may
const messageContainer = document.querySelector(".container");

//audio
var audio = new Audio('Mail Sent.mp3');

//koi bhi join kre tw message show hojai uskay liye
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }

}

//To send a message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

let name1 = prompt("Enter Your Name");
//ab ye emit say new-user-joined ka function emit hoga aur
// socket.on usko accept krega
socket.emit('new-user-joined', name1);

//jo join krraha hay uska message ayega tw uski direction dena
socket.on('user-joined', name1 => {
    append(`${name1} has joined a group`, 'right')
})

//To receive a message
socket.on('receive', data => {
    append(`${data.name1}: ${data.message}`, 'left')
})

//message when user left the chat
socket.on('left', name1 => {
    append(`${name1} left the chat`, 'left')
})