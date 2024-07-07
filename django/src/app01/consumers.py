from channels.generic.websocket import WebsocketConsumer
from channels.exceptions import StopConsumer
from asgiref.sync import async_to_sync
from urllib.parse import parse_qs
import re
import json

# django/src/static/images/meme/9299765.jpg

TABLE = {
    'dog': '/static/images/meme/9299765.jpg'
}

def is_online_image_url(url):
    # Regular expression to match common image file extensions
    image_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp']
    pattern2 = r'^(?:data:image/(?:png|jpeg|gif|webp);base64,)'
    # pattern = r'^.*\.(jpg|jpeg|png|gif)$'
    pattern1 = r'^https?://.*\.(' + '|'.join(image_extensions) + r')'

    combined_pattern = f"({pattern1})|({pattern2}.*)"
    
    # Compile the regex pattern
    regex = re.compile(combined_pattern, re.IGNORECASE)
    
    # Check if the URL matches the pattern
    if regex.match(url):
        return True
    else:
        return False
    

class ChatConsumer(WebsocketConsumer):
    def check_if_static_image(self, text_data):
        pattern = r'^:'  # Regex pattern to match ':dog' exactly
        
        # Check if text_data['message'] matches the regex pattern
        if re.match(pattern, text_data['message']):
            response = TABLE[text_data['message']]
            self.send_image_message(response)
        else:
            return False

    def websocket_connect(self, message):
        self.accept()
        async_to_sync(self.channel_layer.group_add)("chat_room", self.channel_name)

    def websocket_receive(self, message):
        query_params = parse_qs(self.scope['query_string'].decode())
        self.customer_name = query_params.get('customer_name', ['Anonymous'])[0]

        text_data = json.loads(message['text'])

        if text_data['type'] == 'message':
            if " shabi " in text_data['message'] or "傻逼" in text_data['message']:
                text_data['message'] = f"服务器:【{self.customer_name}】你才是傻逼 "
                # self.send(f"服务器:【{self.customer_name}】你才是傻逼 ")
                self.send(text_data['message'])

            elif text_data['message'] == ':dog':
                response = '/static/images/meme/9299765.jpg'
                self.send_image_message(response)
            elif is_online_image_url(text_data['message']):
                return # Do nothing
                # response = text_data['message']
                # self.send_image_message(response)
            else:
                text_data['message'] = text_data['name'] + ": " + text_data['message']
                self.send_chat_message(text_data['message'])
        elif text_data['type'] == 'image':
            self.send_image_message(text_data['image'])

    def websocket_disconnect(self, message):
        async_to_sync(self.channel_layer.group_discard)("chat_room", self.channel_name)
        raise StopConsumer()

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            "chat_room",
            {
                "type": "chat.message",
                "message": message
            }
        )

    def send_image_message(self, image_data):
        # self.customer_name = self.scope['query_string'].decode().split('=')[1]
        query_params = parse_qs(self.scope['query_string'].decode())
        self.customer_name = query_params.get('customer_name', ['Anonymous'])[0]
        async_to_sync(self.channel_layer.group_send)(
            "chat_room",
            {
                "type": "image.message",
                "name": self.customer_name,
                "image": image_data
            }
        )

    def chat_message(self, event):
        self.send(text_data=json.dumps({
            'type': 'message',
            'message': event['message']
        }))

    def image_message(self, event):
        self.send(text_data=json.dumps({
            'type': 'image',
            'name': event['name'],
            'image': event['image']
        }))
