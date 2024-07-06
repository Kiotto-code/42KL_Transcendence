// // Determine the current host and protocol
// const host = window.location.hostname;
// const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

// // Construct the WebSocket URL dynamically
// const port = window.location.port || (protocol === 'wss:' ? '443' : '80');
// // const socketURL = `${protocol}//${host}:${port}/room/123/`;
// // const nickname = nickname;
// // const socketURL = `${protocol}//${host}:${port}/room/123/`;
// const name = encodeURIComponent(nickname); 
// // const socketURL = `${protocol}//${host}:${port}/room/123/?customer_name=${name}`;

// function closeConnect(){
//     socket.close(); //关闭连接 //向服务器发送断开连接的请求
// }


// function handleMessage(event){
//     if(event.key === "Enter"){
//         sendMessage();
//     }
// }

// function socket_state(socket){
//     if (socket.readyState === WebSocket.OPEN) {
//         logMessage('The connection is open', 'warning');
//     } else if (socket.readyState === WebSocket.CONNECTING) {
//         logMessage('The connection is connecting', 'warning');
//     } else if (socket.readyState === WebSocket.CLOSING) {
//         logMessage('The connection is closing', 'warning');
//     } else if (socket.readyState === WebSocket.CLOSED) {
//         logMessage('The connection is closed', 'warning');
//     } else {
//         logMessage('The connection state is unknown', 'warning');
//     }
// }


// // // Determine the current host and protocol
// // const host = window.location.hostname;
// // const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

// // // Construct the WebSocket URL dynamically
// // const port = window.location.port || (protocol === 'wss:' ? '443' : '80');
// // const socketURL = `${protocol}//${host}:${port}/room/123/`;

// // // Create a WebSocket connection
// // const socket = new WebSocket(socketURL);
// let socket = null;

// function newSocket(){
//     // let protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
//     // let socketURL = `${protocol}//${window.location.host}/room/123/`;

//     // // Determine the current host and protocol
//     // const host = window.location.hostname;
//     // const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

//     // // Construct the WebSocket URL dynamically
//     // const port = window.location.port || (protocol === 'wss:' ? '443' : '80');
//     // // const socketURL = `${protocol}//${host}:${port}/room/123/`;
//     // const name = nickname;
//     // // const socketURL = `${protocol}//${host}:${port}/room/123/`;
//     // const socketURL = `${protocol}//${host}:${port}/room/123/?customer_name=${encodeURIComponent(name)}`;
//     const socketURL = `${protocol}//${host}:${port}/room/123/?customer_name=${name}`;

//     // Close existing socket if it's open
//     if (socket !== null && socket.readyState === WebSocket.OPEN) {
//         socket.close();
//     }

//     socket = new WebSocket(socketURL);

//     socket.onopen = function(e){
//         console.log("连接成功");
//         let tag = document.createElement("div");
//         tag.innerText = "连接成功";
//         tag.style.color = "green";
//         tag.append("\t你有朋友了 (｡♥‿♥｡) ");
//         document.querySelector(".message").appendChild(tag);
//     }
    
//     // //回掉函数 //当服务器发送消息过来的时候，会触发这个函数
//     // socket.onmessage = function(e){
//     //     scrollToBottom();
//     //     let message = document.createElement("div");
//     //     message.innerText = e.data;
//     //     document.querySelector(".message").appendChild(message);
//     // } // e.data是服务器发送过来的消息

//     socket.onmessage = function(e){

//         // console.log("e.data : " + e);
//         // var image = JSON.parse(e.data);
//         // if (image.type === 'image') {
//         //     displayImage(image.image);
//         // }

//         let message = document.createElement("div");
//         let messageText = e.data;
        
//         // Split the message by the part you want to style differently
//         let parts = messageText.split(":"); // Example split by colon
        
//         // Create a wrapper for the first part (assuming it's before the colon)
//         let textBeforeColon = document.createElement("span");
//         textBeforeColon.textContent = parts[0];
        
//         // Create a wrapper for the second part (assuming it's after the colon)
//         let textAfterColon = document.createElement("span");
//         textAfterColon.textContent = parts.slice(1).join(":"); // Join back remaining parts
        
//         // Style the second part differently (change color for example)
//         textBeforeColon.style.color = "blue"; // Example: change color to blue
        
//         // Append both parts to the message div
//         message.appendChild(textBeforeColon);
//         message.appendChild(textAfterColon).prepend(": ");
        
//         // Append the message div to the document
//         document.querySelector(".message").appendChild(message);

//         // let imageUrl = 

//         // // Create an image element
//         // let image = document.createElement("img");
//         // image.src = imageUrl; // Set the src attribute to the image URL
    
//         // // Append the image to the .message element
//         // document.querySelector(".message").appendChild(image);

//         scrollToBottom();

//     }
    
    
//     socket.onclose = function(e){
    
//         logMessage(nickname + '连接已断开', 'error');
//         let tag = document.createElement("div");
//         tag.innerText = "连接关闭";
//         tag.append("\t你没朋友了 ｡ﾟ･ (>﹏<) ･ﾟ｡ ");
//         tag.style.color = "red";
//         document.querySelector(".message").appendChild(tag);
//     }
    
// }

// newSocket();

// // Function to handle button click and trigger file upload
// function handleUpload() {
//     const fileInput = document.getElementById('fileInput');
//     const file = fileInput.files[0];

//     if (file) {
//         const reader = new FileReader();

//         reader.onload = function(event) {
//             const imageUrl = event.target.result;

//             // Display the uploaded image immediately
//             displayImage(imageUrl);

//             // Send the image URL via WebSocket
//             socket.send(JSON.stringify({
//                 'image': imageUrl
//             }));
//         };

//         reader.readAsDataURL(file);
//     } else {
//         alert('Please select a file to upload.');
//     }
// }

// function displayImage(imageUrl) {
//     const imageContainer = document.getElementById('message-container');
    
//     // Create an <img> element and set its src attribute to the imageUrl
//     const imgElement = document.createElement('img');
//     imgElement.src = imageUrl;
//     imgElement.style.maxWidth = '100px'; // Adjust styling as needed
//     imgElement.style.display = 'inline-block';
//     // Append the image element to the container
//     // imageContainer.innerHTML = ''; // Clear previous content if any
//     imageContainer.appendChild(imgElement);
// }

// /**
//     handleupload
//         function displayImage(imageUrl) {
//             const imageContainer = document.getElementById('message-container');
            
//             // Create an <img> element and set its src attribute to the imageUrl
//             const imgElement = document.createElement('img');
//             imgElement.src = imageUrl;
//             imgElement.style.maxWidth = '100px'; // Adjust styling as needed
//             imgElement.style.display = 'inline-block';
//             // Append the image element to the container
//             // imageContainer.innerHTML = ''; // Clear previous content if any
//             imageContainer.appendChild(imgElement);
//         }

//         // // Function to display the uploaded image in the browser
//         // function displayImage(imageUrl) {
//         //     const imageContainer = document.getElementById('imageContainer');

//         //     // Clear previous content
//         //     imageContainer.innerHTML = '';

//         //     // Create an <img> element and set its attributes
//         //     const imgElement = document.createElement('img');
//         //     imgElement.src = imageUrl;
//         //     imgElement.alt = 'Uploaded Image'; // Optional: Add alt text for accessibility
//         //     imgElement.style.maxWidth = '100%';
//         //     imgElement.style.height = 'auto'; // Ensure aspect ratio is maintained

//         //     // Append the <img> element to the image container
//         //     imageContainer.appendChild(imgElement);
//         // }

//         // Function to handle button click and trigger file upload
//         function handleUpload() {
//             const fileInput = document.getElementById('fileInput');
//             const file = fileInput.files[0];

//             // print("file : ", file);

//             if (file) {
//                 const reader = new FileReader();

//                 reader.onload = function(event) {
//                     const imageUrl = event.target.result;

//                     // Display the uploaded image immediately
//                     socket.send(nickname + " :");
//                     // socket.send(nickname + " :" + imageUrl);
//                     displayImage(imageUrl);
                    
//                     // Send the image URL via WebSocket
//                 };

//                 reader.readAsDataURL(file);
//             } else {
//                 alert('Please select a file to upload.');
//             }
//         }
//  */




// function openConnect(){
//     if (socket.readyState === WebSocket.OPEN)
//         return;
//     newSocket(); //重新连接
// }

// const styles = {
//     default: 'color: black;', // Default style
//     warning: 'color: orange; font-weight: bold;', // Warning style
//     error: 'color: red; font-weight: bold;' // Error style
// };

// function logMessage(message, style = 'default') {
//     console.log(`%c${message}`, styles[style]);
// }

// function sendMessage(){
//     // if socker not connected checking
//     socket_state(socket);

//     let message = document.getElementById("txt");

//     // message.value only spaces
//     if (message.value.trim() == ""){
//         ;
//     }
//     else
//         socket.send(nickname +  " :" + message.value);
//     message.value = "";
// } //向服务器发送消息

// function scrollToBottom() {
//     var messageContainer = document.getElementById('message-container');
//     messageContainer.scrollTop = messageContainer.scrollHeight;
// }

// Determine the current host and protocol
const host = window.location.hostname;
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const port = window.location.port || (protocol === 'wss:' ? '443' : '80');
const name = encodeURIComponent(nickname);

// Construct the WebSocket URL dynamically
const socketURL = `${protocol}//${host}:${port}/room/123/?customer_name=${name}`;

let socket = null;

function newSocket() {
    // Close existing socket if it's open
    if (socket !== null && socket.readyState === WebSocket.OPEN) {
        socket.close();
    }

    // Create a new WebSocket connection
    socket = new WebSocket(socketURL);

    socket.onopen = function(event) {
        console.log("WebSocket connection opened.");
        let tag = document.createElement("div");
        tag.innerText = "连接成功";
        tag.style.color = "green";
        tag.append("\t你有朋友了 (｡♥‿♥｡) ");
        document.querySelector(".message").appendChild(tag);
    };

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
            displayChatMessage(data.message);
        } else if (data.type === 'image') {
            displayImage(data.image, data.name);
            // displayImageMessage(data.image);
        }
        scrollToBottom();
    };

    

    // socket.onmessage = function(event) {
    //     let message = document.createElement("div");

    //     // Get the message text from the event data
    //     data = JSON.parse(event.data);
        
    //     let messageText = data.message.trim()

    //     // let messageText = event.data
        
    //     // Split the message by the part you want to style differently
    //     let parts = messageText.split(":");
        
    //     // Create a wrapper for the first part (assuming it's before the colon)
    //     let textBeforeColon = document.createElement("span");
    //     textBeforeColon.textContent = parts[0];
    //     // textBeforeColon.textContent = encodeURIComponent(nickname);
    //     textBeforeColon.style.color = "blue"; // Example: change color to blue
        
    //     // Create a wrapper for the second part (assuming it's after the colon)
    //     let textAfterColon = document.createElement("span");
    //     textAfterColon.textContent = parts.slice(1);
        
    //     // Append both parts to the message div
    //     message.appendChild(textBeforeColon);
    //     message.appendChild(textAfterColon).prepend(": ");
        
    //     // Append the message div to the document
    //     document.querySelector(".message").appendChild(message);

    //     scrollToBottom();
    // };

    // socket.onmessage = function(event) {
    //     let message = document.createElement("div");
    
    //     // Parse the JSON data received from WebSocket
    //     let data = JSON.parse(event.data);
    
    //     // Extract the message value
    //     let messageText = data.message.trim(); // Assuming data.message is "queen1 , ds"
    
    //     // Create a span element to display the message
    //     let messageSpan = document.createElement("span");
    //     messageSpan.textContent = messageText;
    
    //     // Append the message span to the message div
    //     message.appendChild(messageSpan);
    
    //     // Append the message div to the document
    //     document.querySelector(".message").appendChild(message);
    
    //     scrollToBottom();
    // };
    

    socket.onclose = function(event) {
        console.log("WebSocket connection closed.");
        logMessage(nickname + '连接已断开', 'error');
        let tag = document.createElement("div");
        tag.innerText = "连接关闭";
        tag.append("\t你没朋友了 ｡ﾟ･ (>﹏<) ･ﾟ｡ ");
        tag.style.color = "red";
        document.querySelector(".message").appendChild(tag);
    };

    socket.onerror = function(error) {
        console.error("WebSocket error:", error);
    };
}

// Initial connection
newSocket();

// Function to handle button click and trigger file upload
function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const imageUrl = event.target.result;

            // Display the uploaded image immediately
            // displayImage(imageUrl);

            // Send the image URL via WebSocket
            socket.send(JSON.stringify({
                'type': 'image',
                'name': nickname,
                'image': imageUrl
            }));
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please select a file to upload.');
    }
}

// Display uploaded image
function displayImage(imageUrl, name) {
    const imageContainer = document.getElementById('message-container');
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.style.maxWidth = '100px'; // Adjust styling as needed
    imgElement.style.display = 'inline-block';
    imageContainer.appendChild(imgElement);

    let username = document.createElement("div");
    username.innerText = name;
    username.style.color = "blue";



    imageContainer.appendChild(username);
    // imageContainer.appendChild(document.createElement('br'));
}

// Function to send a chat message via WebSocket
function sendMessage() {
    if (socket.readyState === WebSocket.OPEN) {
        let message = document.getElementById("txt").value.trim();
        if (message !== "") {
            socket.send(JSON.stringify({
                'type': 'message',
                'name': nickname,
                'message': nickname + " : " + message
            }));
            document.getElementById("txt").value = "";
        }
    } else {
        socket_state(socket); // Handle socket state if necessary
    }
}

// Function to log messages with different styles
const styles = {
    default: 'color: black;',
    warning: 'color: orange; font-weight: bold;',
    error: 'color: red; font-weight: bold;'
};

function logMessage(message, style = 'default') {
    console.log(`%c${message}`, styles[style]);
}

// Function to check and display socket state
function socket_state(socket) {
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

// Function to scroll to the bottom of message container
function scrollToBottom() {
    var messageContainer = document.getElementById('message-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Function to handle Enter key press for sending messages
function handleMessage(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function displayChatMessage(data) {
        let message = document.createElement("div");
        let messageText = data.trim()

        // let messageText = event.data
        
        // Split the message by the part you want to style differently
        let parts = messageText.split(":");
        
        // Create a wrapper for the first part (assuming it's before the colon)
        let textBeforeColon = document.createElement("span");
        textBeforeColon.textContent = parts[0];
        // textBeforeColon.textContent = encodeURIComponent(nickname);
        textBeforeColon.style.color = "blue"; // Example: change color to blue
        
        // Create a wrapper for the second part (assuming it's after the colon)
        let textAfterColon = document.createElement("span");
        textAfterColon.textContent = parts.slice(1);
        
        // Append both parts to the message div
        message.appendChild(textBeforeColon);
        message.appendChild(textAfterColon).prepend(": ");
        
        // Append the message div to the document
        document.querySelector(".message").appendChild(message);

        // scrollToBottom();

}
