# from channels.generic.websocket import WebsocketConsumer
# from channels.exceptions import StopConsumer
# from asgiref.sync import async_to_sync

# import json
# # from color_class import TerminalColors

# import re

# # ChatConsumer inherits from WebsocketConsumer. Also known as Polymorphism.
# # It is called by the routing.py file (routing.websocket_urlpatterns)
# # The consumer is a class that handles websocket connections
# class ChatConsumer(WebsocketConsumer):
#     def websocket_connect(self, message):
#         self.accept()
#         async_to_sync(self.channel_layer.group_add)("lounge_chat", self.channel_name)
        
#     def websocket_receive(self, message):
#         # self.send(text_data=message["text"]) # Send message to WebSocket for only self
#         text = message['text']
#         self.customer_name = self.scope['query_string'].decode().split('=')[1]
#         if " shabi " in text or "傻逼" in text:
#             self.send(f"服务器:【{self.customer_name}】你才是傻逼 ")
#             return
#         async_to_sync(self.channel_layer.group_send)(
#             "lounge_chat",
#             {
#                 "type": "chat.message",
#                 "text": message["text"],
#             },
#         )
        
#     def chat_message(self, event):
#         self.send(text_data=event["text"]) # Send message to WebSocket
        
#     def websocket_disconnect(self, message):
#         print("\033[91mwebsocket_disconnect 被断链接了\033[0m")
#         async_to_sync(self.channel_layer.group_discard)("lounge_chat", self.channel_name)
#         raise StopConsumer()# Stop socket conenction

#     def receive(self, text_data):
#         image_data = json.loads(text_data)['image']
#         self.send_image(image_data)

#     def send_image(self, image_data):
#         self.send(text_data=json.dumps({
#             'type': 'image',
#             'image': image_data
#         }))
 

from channels.generic.websocket import WebsocketConsumer
from channels.exceptions import StopConsumer
from asgiref.sync import async_to_sync
import json

class ChatConsumer(WebsocketConsumer):
    def websocket_connect(self, message):
        self.accept()
        async_to_sync(self.channel_layer.group_add)("chat_room", self.channel_name)

    def websocket_receive(self, message):
        text_data = json.loads(message['text'])
        if text_data['type'] == 'message':
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
        self.customer_name = self.scope['query_string'].decode().split('=')[1]
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
