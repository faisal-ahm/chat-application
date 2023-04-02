const socket = io('https://chatappserverbyfaisal.herokuapp.com/', { transports : ['websocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('media/popnot.mp3');


const append = (message, position, color = 0)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
    if(color === 1){
        messageElement.classList.add('joined-chat');
    }
    if(color === -1){
        messageElement.classList.add('left-chat');
    }
    if(position == 'left'){
        audio.play();
    }
    
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`YOU : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const Name = prompt("Enter name to join");
socket.emit('new-user-joined', Name);
console.log(Name);

socket.on('user-joined', name=>{
append(`${name} joined the chat`, 'right', 1);
})
socket.on('recieve', data=>{
append(`${data.name} : ${data.message}`, 'left');
})

socket.on('left', name=>{
append(`${name} left the chat`, 'left', -1);
})