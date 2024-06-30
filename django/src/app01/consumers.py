from channels.generic.websocket import WebsocketConsumer
from channels.exceptions import StopConsumer
# from color_class import TerminalColors

import re

CONST_LIST = []

# ChatConsumer inherits from WebsocketConsumer. Also known as Polymorphism.
# It is called by the routing.py file (routing.websocket_urlpatterns)
# The consumer is a class that handles websocket connections
class ChatConsumer(WebsocketConsumer):
    def websocket_connect(self, message):
        print("websocket_connect 被lianjie了")
        #client send websocket request(asyc)
        #server accept the request
        self.accept()
        CONST_LIST.append(self)
        #server send message to client

        
    def websocket_receive(self, message):
        if self not in CONST_LIST:
            CONST_LIST.append(self)
        text = message['text']
        
        pattern = r'^(\w+ ):(.*)$'
        match = re.search(pattern, text)
        name = match.group(1)
        content = match.group(2)

        if " shabi " in text or "傻逼" in text:
               self.send(f"服务器: {name}你才是傻逼 ")
            #    self.close()
            #    return
            
        for CONN in CONST_LIST:
            CONN.send(f"{name}: {content}")
        # if " shabi " in text or "傻逼" in text or "关闭" in text:
        #        self.send("服务器：你才是傻逼")
        #        self.close()
        #        return
        if content == "":
            return
        print("姐收到self", self)
        # print("姐收到text", self.text)
           
        # res = f"服务器返回 ->{text}"
        
        # self.send(res)

    def websocket_disconnect(self, message):
        print("\033[91mwebsocket_disconnect 被断链接了\033[0m")
        CONST_LIST.remove(self)
        raise StopConsumer()# Stop socket conenction
 