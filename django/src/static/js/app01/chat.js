const host = window.location.hostname;
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const port = window.location.port || (protocol === 'wss:' ? '443' : '80');
const name = encodeURIComponent(nickname);

let currentUrl = window.location.href;
let url = new URL(currentUrl);
let group_num = url.searchParams.get('room') || 123;

const socketURL = `${protocol}//${host}:${port}/room/${group_num}/?customer_name=${name}`;
let socket = null;

function newSocket() {
    if (socket !== null && socket.readyState === WebSocket.OPEN) {
        socket.close();
    }

    socket = new WebSocket(socketURL);

    socket.onopen = function(event) {
        handleSocketOpen();
    };

    socket.onmessage = function(event) {
        handleSocketMessage(event);
    };

    socket.onclose = function(event) {
        handleSocketClose();
    };

    socket.onerror = function(error) {
        console.error("WebSocket error:", error);
    };
}

function openConnect() {
    if (socket.readyState === WebSocket.OPEN) return;
    newSocket();
}

newSocket();

function closeConnect() {
    if (socket) {
        socket.close(); // Close the connection
    }
}

function handleSocketOpen() {
    console.log("WebSocket connection opened.");
    appendStatusMessage("连接成功", "green", "你有朋友了 (｡♥‿♥｡)\n");
}

function handleSocketMessage(event) {
    const data = JSON.parse(event.data);
    if (data.type === 'message') {
        displayChatMessage(data.message, data.name);
    } else if (data.type === 'image') {
        displayImage(data.image, data.name);
    }else {
        displayChatMessage(data.message, data.name);
    }
    scrollToBottom();
}

function handleSocketClose() {
    console.log("WebSocket connection closed.");
    logMessage(nickname + '连接已断开', 'error');
    appendStatusMessage("连接关闭", "red", "你没朋友了 ｡ﾟ･ (>﹏<) ･ﾟ｡\n");
}

document.getElementById('fileInput').addEventListener('change', handleUpload);
function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

        if (file.size > MAX_FILE_SIZE) {
            alert('File size exceeds the 5 MB limit.');
            return; // Exit the function if file size is too large
        }
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
// function displayImage(imageUrl, name) {
//     const imageContainer = document.getElementById('message-container');
//     const imgElement = document.createElement('img');
//     imgElement.src = imageUrl;
//     imgElement.style.maxWidth = '100px'; // Adjust styling as needed
//     imgElement.style.display = 'inline-block';
    
//     let username = document.createElement("div");
//     username.innerText = name + " : ";
//     username.style.color = "blue";
//     imageContainer.appendChild(username);
    
//     imgElement.onload = function() {
//         imageContainer.appendChild(imgElement);
//         // let username = document.createElement("div");
//         // username.innerText = "\n";
//         imageContainer.appendChild(document.createElement("div")).innerText = "\n";
        
//         scrollToBottom();
//     };

//     imgElement.onerror = function() {
//         // Remove the image element if it fails to load
//         imgElement.remove();
        
//         // Display an error message or a placeholder image
//         const errorMessage = document.createElement("div");
//         errorMessage.innerText = "Failed to load image";
//         errorMessage.style.color = "red";
//         imageContainer.appendChild(errorMessage);
        
//         // Add a placeholder image if desired
//         const placeholder = document.createElement('img');
//         placeholder.src = 'static/images/meme/miku_impatient.png'; // Provide a valid path to a placeholder image
//         placeholder.style.maxWidth = '100px';
//         placeholder.style.display = 'inline-block';
//         imageContainer.appendChild(placeholder);
        
//         imageContainer.appendChild(document.createElement("div")).innerText = "\n";
//         scrollToBottom();
//     };


//     // imageContainer.appendChild(document.createElement('br'));
// }

function displayImage(imageUrl, name) {
    const imageContainer = document.getElementById('message-container');
    
    // Create a container for the image and username
    const messageWrapper = document.createElement('div');
    messageWrapper.style.display = 'inline-flex'; // Align items horizontally

    // Create and style the username element
    const username = document.createElement("span");
    username.textContent = name;
    username.textContent.endsWith('：') ? username.textContent : username.textContent += '：';
    username.style.color = "blue";
    username.style.fontWeight = 'bold';
    // username.style.width = "auto";
    // username.style.display = 'inline-flex';
    username.style.marginRight = '10px';
    
    // Create the image element
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.style.maxWidth = '100px'; // Adjust styling as needed
    imgElement.style.height = 'auto'; // Maintain aspect ratio
    imgElement.style.display = 'inline-block';

    // Add a placeholder for the image
    const placeholderUrl = 'static/images/meme/miku_impatient.png'; // Path to placeholder image
    const placeholder = document.createElement('img');
    placeholder.src = placeholderUrl;
    placeholder.style.maxWidth = '100px';
    placeholder.style.height = 'auto';
    placeholder.style.display = 'none'; // Initially hidden

    // Append username and image to the wrapper
    messageWrapper.appendChild(username);
    messageWrapper.appendChild(imgElement);
    messageWrapper.appendChild(placeholder);
    imageContainer.appendChild(messageWrapper);

    // Handle image load success
    imgElement.onload = function() {
        placeholder.style.display = 'none'; // Hide placeholder if image loads successfully
        imageContainer.appendChild(document.createElement("div")).innerText = "\n";
        scrollToBottom();
    };

    // Handle image load error
    imgElement.onerror = function() {
        imgElement.style.display = 'none'; // Hide the actual image
        placeholder.style.display = 'inline-block'; // Show placeholder
        const errorMessage = document.createElement("div");
        errorMessage.innerText = "Failed to load image";
        errorMessage.style.color = "red";
        imageContainer.appendChild(errorMessage);
        scrollToBottom();
    };
}


function sendMessage() {
    if (socket.readyState === WebSocket.OPEN) {
        let message = document.getElementById("txt").value.trim();
        // message.focus();
        // message.setSelectionRange(7, 7);
        if (message !== "") {
            socket.send(JSON.stringify({
                'type': 'message',
                'name': nickname,
                'message': message
            }));
            document.getElementById("txt").value = "";
        }
    } else {
        socket_state(socket);
        openConnect();
    }
}

url='https://upload.wikimedia.org/wikipedia/commons/0/09/Blackpink_Coachella_2023_02_%28cropped%29.jpg';

function displayChatMessage(data, name) {
    if (typeof data !== 'string') {
        console.error('Invalid input: expected a string.');
        return;
    }

    let message = document.createElement("div");
    message.style.display = 'flex';
    let messageText = data.trim();

    // Regular expression to detect "name: message" format
    let regex = /^([^:]*):(.*)$/;
    let match = regex.exec(messageText);

    if (match) {
        let username = document.createElement("span");
        username.textContent = name;
        // username.textContent.endsWith('：') ? username.textContent : username.textContent += '：';
        username.textContent = name + " :";
        // username.textContent = match[1].trim() + " :";
        username.style.color = "blue";
        username.style.fontWeight = 'bold';
        username.style.width = "70px";
        // username.style.display = 'inline-flex';
        username.style.marginRight = '10px';

        let placeholderContainer = document.createElement("span");
        placeholderContainer.style.padding = '0px'; // Padding for content
        placeholderContainer.style.display = 'inline-block'; // Ensure it fits content width
        placeholderContainer.style.maxWidth = 'calc(100% - 50px)'; // Prevent overflow

        let content = match[2].trim();

        // Replace URLs with anchor tags
        content = content.replace(/(https?:\/\/[^\s]+)/g, (url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });

        // Set the HTML content with links
        placeholderContainer.innerHTML = content;

        message.appendChild(username);
        message.appendChild(placeholderContainer);
    } else {
        // Replace URLs with anchor tags if no colon is found
        messageText = messageText.replace(/(https?:\/\/[^\s]+)/g, (url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });

        let placeholderContainer = document.createElement("div");
        placeholderContainer.style.border = '1px solid #ddd'; // Style the border
        placeholderContainer.style.borderRadius = '5px'; // Rounded corners
        placeholderContainer.style.padding = '5px'; // Padding for content
        placeholderContainer.style.backgroundColor = '#f9f9f9'; // Background color
        placeholderContainer.style.display = 'inline-block'; // Ensure it fits content width
        placeholderContainer.style.maxWidth = 'calc(100% - 50px)'; // Prevent overflow

        let textNode = document.createElement("span");
        textNode.innerHTML = messageText;

        placeholderContainer.appendChild(textNode);
        message.appendChild(placeholderContainer);
    }

    let messageContainer = document.querySelector(".message");
    if (messageContainer) {
        messageContainer.appendChild(message);
    } else {
        console.error('Element with class "message" not found.');
    }
}

// function displayChatMessage(data) {
//     if (typeof data !== 'string') {
//         console.error('Invalid input: expected a string.');
//         return;
//     }

//     let message = document.createElement("div");
//     let messageText = data.trim();

//     // Regular expression to detect "name: message" format
//     let regex = /^([^:]*):(.*)$/;
//     let match = regex.exec(messageText);

//     if (match) {
//         let username = document.createElement("span");
//         username.textContent = match[1].trim() + " : ";
//         username.style.color = "blue";
//         username.style.marginRight = '10px'; 

//         let textAfterColon = document.createElement("span");
//         let content = match[2].trim();

//         // Replace URLs with anchor tags
//         content = content.replace(/(https?:\/\/[^\s]+)/g, (url) => {
//             return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
//         });

//         // Set the HTML content with links
//         textAfterColon.innerHTML = content;

//         message.appendChild(username);
//         // message.appendChild(document.createTextNode(" : "));
//         message.appendChild(textAfterColon);
//     } else {
//         // Replace URLs with anchor tags if no colon is found
//         messageText = messageText.replace(/(https?:\/\/[^\s]+)/g, (url) => {
//             return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
//         });

//         let textNode = document.createElement("span");
//         textNode.innerHTML = messageText;
//         message.appendChild(textNode);
//     }

//     let messageContainer = document.querySelector(".message");
//     if (messageContainer) {
//         messageContainer.appendChild(message);
//     } else {
//         console.error('Element with class "message" not found.');
//     }
// }


// function displayChatMessage(data) {
//     let message = document.createElement("div");
//     let messageText = data.trim();

//     // Regular expression to detect a URL (basic version)
//     let urlRegex = /(https?:\/\/[^\s]+)/g;

//     // Regular expression to detect "name: message" format
//     let regex = /^([^:]*):(.*)$/;
//     let match = regex.exec(messageText);

//     if (match) {
//         let textBeforeColon = document.createElement("span");
//         textBeforeColon.textContent = match[1].trim();
//         textBeforeColon.style.color = "blue";

//         // Create a container for the message content
//         let textAfterColon = document.createElement("span");
//         let content = match[2].trim();

//         // Replace URLs with anchor tags
//         content = content.replace(urlRegex, (url) => {
//             return `<a href="https://upload.wikimedia.org/wikipedia/commons/0/09/Blackpink_Coachella_2023_02_%28cropped%29.jpg" target="_blank" rel="noopener noreferrer">${url}</a>`;
//         });

//         // Set the HTML content with links
//         textAfterColon.innerHTML = content;

//         message.appendChild(textBeforeColon);
//         message.appendChild(document.createTextNode(" : "));
//         message.appendChild(textAfterColon);
//     } else {
//         // Replace URLs with anchor tags if no colon is found
//         messageText = messageText.replace(urlRegex, (url) => {
//             return `<a href="https://upload.wikimedia.org/wikipedia/commons/0/09/Blackpink_Coachella_2023_02_%28cropped%29.jpg" target="_blank" rel="noopener noreferrer">${url}</a>`;
//         });
        
//         let textNode = document.createElement("span");
//         textNode.innerHTML = messageText;
//         message.appendChild(textNode);
//     }

//     document.querySelector(".message").appendChild(message);
// }


function appendStatusMessage(status, color, message) {
    let tag = document.createElement("div");
    tag.innerText = status;
    tag.style.color = color;
    tag.append(`\t${message}`);
    let message_sect = document.querySelector(".message");
    if (message_sect) {
        message_sect.appendChild(tag);
    }
}

function scrollToBottom() {
    var messageContainer = document.getElementById('message-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function logMessage(message, style = 'default') {
    const styles = {
        default: 'color: black;',
        warning: 'color: orange; font-weight: bold;',
        error: 'color: red; font-weight: bold;'
    };
    console.log(`%c${message}`, styles[style]);
}

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

function handleMessage(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function dataURLToBlob(dataURL) {
    const BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
        const parts = dataURL.split(',');
        const contentType = parts[0].split(':')[1];
        const raw = parts[1];
        return new Blob([raw], { type: contentType });
    }

    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}
