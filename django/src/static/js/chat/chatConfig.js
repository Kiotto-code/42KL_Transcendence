// config.js
export function getWebSocketConfig() {
    let host = window.location.hostname;
    let protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    let port = window.location.port || (protocol === 'wss:' ? '443' : '80');
    return { host, protocol, port };
}

export function getChatConfig() {
    let appConfigElement = document.getElementById('chat-config');
    return {
        nickname: appConfigElement.getAttribute('data-nickname'),
        roomId: appConfigElement.getAttribute('data-room')
    };
}
