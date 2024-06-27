function closeConnect(){
    socket.close(); //关闭连接 //向服务器发送断开连接的请求
}
function handleMessage(event){
    if(event.key === "Enter"){
        sendMessage();
    }
}

socket = new WebSocket("ws://127.0.0.1:8000/room/123/");

socket.onopen = function(e){
    console.log("连接成功");
    let tag = document.createElement("div");
    tag.innerText = "连接成功";
    document.querySelector(".message").appendChild(tag);
}


//回掉函数 //当服务器发送消息过来的时候，会触发这个函数
socket.onmessage = function(e){
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
    socket.send(message.value);


}
