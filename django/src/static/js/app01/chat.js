function closeConnect(){
    socket.close(); //关闭连接 //向服务器发送断开连接的请求
}
function handleMessage(event){
    if(event.key === "Enter"){
        sendMessage();
    }
}

// Determine the current host and protocol
const host = window.location.hostname;
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

// Construct the WebSocket URL dynamically
const port = window.location.port || (protocol === 'wss:' ? '443' : '80');
const socketURL = `${protocol}//${host}:${port}/room/123/`;

// Create a WebSocket connection
const socket = new WebSocket(socketURL);
// socket = new WebSocket("ws://127.0.0.1:8000/room/123/");


socket.onopen = function(e){
    console.log("连接成功");
    let tag = document.createElement("div");
    tag.innerText = "连接成功";
    document.querySelector(".message").appendChild(tag);
}


//回掉函数 //当服务器发送消息过来的时候，会触发这个函数
socket.onmessage = function(e){
    scrollToBottom();
    let message = document.createElement("div");
    message.innerText = e.data;
    document.querySelector(".message").appendChild(message);
}
// socket.onmessage = function(e){
// 	console.log(e.data);
// }

socket.onclose = function(e){
    console.log("连接关闭");
    let tag = document.createElement("div");
    tag.innerText = "连接关闭";
    document.querySelector(".message").appendChild(tag);
}

function sendMessage(){
    let message = document.getElementById("txt");

    socket.send(nickname +  " :" + message.value);
    // let messageToSend = `${request.user.id}: ${message.value}`;
    // socket.send(messageToSend);

}

// function sendMessage() {
//     let messageInput = document.getElementById("txt");
//     let message = messageInput.value.trim();

//     if (message) {
//         // Construct the message to send
//         let messageToSend = `${request.user.id}: ${message}`;
        
//         // Send the constructed message to the server
//         socket.send(messageToSend.value);

//         // Clear the input field after sending
//         messageInput.value = '';
//     }
//     else
//         socket.send(messageInput.value);

// }

function scrollToBottom() {
    var messageContainer = document.getElementById('message-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

