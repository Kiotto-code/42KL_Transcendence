from channels.generic.websocket import WebsocketConsumer
from channels.exceptions import StopConsumer
from asgiref.sync import async_to_sync

import json
# from color_class import TerminalColors

import re

# ChatConsumer inherits from WebsocketConsumer. Also known as Polymorphism.
# It is called by the routing.py file (routing.websocket_urlpatterns)
# The consumer is a class that handles websocket connections
class ChatConsumer(WebsocketConsumer):
    def websocket_connect(self, message):
        self.accept()
        async_to_sync(self.channel_layer.group_add)("lounge_chat", self.channel_name)
        
    def websocket_receive(self, message):
        async_to_sync(self.channel_layer.group_send)(
            "lounge_chat",
            {
                "type": "chat.message",
                "text": message["text"],
            },
        )
    def websocket_disconnect(self, message):
        print("\033[91mwebsocket_disconnect 被断链接了\033[0m")
        CONST_LIST.remove(self)
        raise StopConsumer()# Stop socket conenction
 