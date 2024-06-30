function closeConnect(){
    socket.close(); //关闭连接 //向服务器发送断开连接的请求
}


function handleMessage(event){
    if(event.key === "Enter"){
        sendMessage();
    }
}

function socket_state(socket){
    if (socket.readyState === WebSocket.OPEN) {
        logMessage('The connection is open', 'warning');
    } else if (socket.readyState === WebSocket.CONNECTING) {
        logMessage('The connection is connecting', 'warning');
    } else if (socket.readyState === WebSocket.CLOSING) {
        logMessage('The connection is closing', 'warning');
    } else if (socket.readyState === WebSocket.CLOSED) {
        logMessage('The connection is closed', 'warning');
    } else {
        logMessage('The connection state is unknown', 'warning');
    }
}


// // Determine the current host and protocol
// const host = window.location.hostname;
// const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

// // Construct the WebSocket URL dynamically
// const port = window.location.port || (protocol === 'wss:' ? '443' : '80');
// const socketURL = `${protocol}//${host}:${port}/room/123/`;

// // Create a WebSocket connection
// const socket = new WebSocket(socketURL);
let socket = null;

function newSocket(){
    const host = window.location.hostname;
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

    // Construct the WebSocket URL dynamically
    const port = window.location.port || (protocol === 'wss:' ? '443' : '80');
    const socketURL = `${protocol}//${host}:${port}/room/123/`;

    // Create a WebSocket connection
    socket = new WebSocket(socketURL);

    // Close existing socket if it's open
    if (socket !== null && socket.readyState === WebSocket.OPEN) {
        socket.close();
    }

    socket = new WebSocket(tmp);

    socket.onopen = function(e){
        console.log("连接成功");
        let tag = document.createElement("div");
        tag.innerText = "连接成功";
        tag.style.color = "green";
        tag.append("\t你有朋友了 (｡♥‿♥｡) ");
        document.querySelector(".message").appendChild(tag);
    }
    
    // //回掉函数 //当服务器发送消息过来的时候，会触发这个函数
    // socket.onmessage = function(e){
    //     scrollToBottom();
    //     let message = document.createElement("div");
    //     message.innerText = e.data;
    //     document.querySelector(".message").appendChild(message);
    // } // e.data是服务器发送过来的消息

    socket.onmessage = function(e){
        scrollToBottom();
        let message = document.createElement("div");
        let messageText = e.data;
        
        // Split the message by the part you want to style differently
        let parts = messageText.split(":"); // Example split by colon
        
        // Create a wrapper for the first part (assuming it's before the colon)
        let textBeforeColon = document.createElement("span");
        textBeforeColon.textContent = parts[0];
        
        // Create a wrapper for the second part (assuming it's after the colon)
        let textAfterColon = document.createElement("span");
        textAfterColon.textContent = parts.slice(1).join(":"); // Join back remaining parts
        
        // Style the second part differently (change color for example)
        textBeforeColon.style.color = "blue"; // Example: change color to blue
        
        // Append both parts to the message div
        message.appendChild(textBeforeColon);
        message.appendChild(textAfterColon).prepend(": ");
        
        // Append the message div to the document
        document.querySelector(".message").appendChild(message);


        // let imageUrl = ;

        // // Create an image element
        // let image = document.createElement("img");
        // image.src = imageUrl; // Set the src attribute to the image URL
    
        // // Append the image to the .message element
        // document.querySelector(".message").appendChild(image);
    }
    
    
    socket.onclose = function(e){
    
        logMessage(nickname + '连接已断开', 'error');
        let tag = document.createElement("div");
        tag.innerText = "连接关闭";
        tag.append("\t你没朋友了 ｡ﾟ･ (>﹏<) ･ﾟ｡ ");
        tag.style.color = "red";
        document.querySelector(".message").appendChild(tag);
    }
    
}
// const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
// const tmp = `${protocol}//${window.location.host}/room/123/`;
// const socket = new WebSocket(tmp);
newSocket();

function onImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageUrl = event.target.result;
        socket.send(nickname +  " :" + imageUrl);
    };
    reader.readAsDataURL(file);
}

function openConnect(){
    if (socket.readyState === WebSocket.OPEN)
        return;
    newSocket(); //重新连接
}

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

// socket.onopen = function(e){
//     console.log("连接成功");
//     let tag = document.createElement("div");
//     tag.innerText = "连接成功";
//     document.querySelector(".message").appendChild(tag);
// }


// //回掉函数 //当服务器发送消息过来的时候，会触发这个函数
// socket.onmessage = function(e){
//     scrollToBottom();
//     let message = document.createElement("div");
//     message.innerText = e.data;
//     document.querySelector(".message").appendChild(message);
// } // e.data是服务器发送过来的消息

// socket.onclose = function(e){

//     logMessage(nickname + '连接已断开', 'error');
//     let tag = document.createElement("div");
//     tag.innerText = "连接关闭";
//     tag.append("\t你没朋友了 ｡ﾟ･ (>﹏<) ･ﾟ｡ ");
//     tag.style.color = "red";
//     document.querySelector(".message").appendChild(tag);
// }

function sendMessage(){
    // if socker not connected checking
    socket_state(socket);

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

