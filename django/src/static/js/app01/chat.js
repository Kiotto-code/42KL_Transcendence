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

// const tmp = `${protocol}//${host}:${port}/room/123/`;
// const tmp = `${protocol}//${window.location.host}/room/123/`;
// const socket = new WebSocket(tmp);

// socket = new WebSocket("ws://127.0.0.1:8000/room/123/");

const styles = {
    default: 'color: black;', // Default style
    warning: 'color: orange; font-weight: bold;', // Warning style
    error: 'color: red; font-weight: bold;' // Error style
};

function logMessage(message, style = 'default') {
    console.log(`%c${message}`, styles[style]);
}

function logMessage(message, style = 'default') {
    console.log(`%c${message}`, styles[style]);
}

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
} // e.data是服务器发送过来的消息

socket.onclose = function(e){

    logMessage(nickname + '连接已断开', 'error');
    let tag = document.createElement("div");
    tag.innerText = "连接关闭";
    tag.append("\t你没朋友了 ｡ﾟ･ (>﹏<) ･ﾟ｡ ");
    tag.style.color = "red";
    document.querySelector(".message").appendChild(tag);
}

function sendMessage(){
    let message = document.getElementById("txt");

    // message.value only spaces
    if (message.value.trim() == ""){
        ;
    }
    else
        socket.send(nickname +  " :" + message.value);
    message.value = "";
} //向服务器发送消息

function scrollToBottom() {
    var messageContainer = document.getElementById('message-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

