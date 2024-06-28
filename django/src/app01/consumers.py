from channels.generic.websocket import WebsocketConsumer
from channels.exceptions import StopConsumer
from django.utils.html import escape
from django.urls import reverse


CONST_LIST = []


# ChatConsumer inherits from WebsocketConsumer. Also known as Polymorphism.
# It is called by the routing.py file (routing.websocket_urlpatterns)
# The consumer is a class that handles websocket connections
class ChatConsumer(WebsocketConsumer):
    def websocket_connect(self, message):
        print("websocket_connect 被插了")
        #client send websocket request(asyc)
        #server accept the request
        self.accept()
        #server send message to client
        # self.send("来了啊，老弟")
        
    def websocket_receive(self, message):
        text = message['text']
        # print("姐收到信息", text)
        # print("Attributes of self:", dir(self))
        # print("\n\n")
        # print("Instance attributes of self:", vars(self))
        # print("姐收到信息", message)
        
        
        if " shabi " in text or "傻逼" in text or "关闭" in text:
               self.send("服务器：你才是傻逼")
               self.close()
               return
           
        # user_id = self.scope['user'].id
        # profile_url = reverse('user_profile', kwargs={'user_id': user_id})
        # res = f"{self.scope['user'].profile.nickname}: {text}"
        # name = self.scope['user'].username if self.scope['user'].is_authenticated else "Anonymous"

        res = f"{text}SB"
        
        self.send(res)

    def websocket_disconnect(self, message):
        print("websocket_disconnect 被断链接了") # This is printed on the server side when the client disconnects
        raise StopConsumer()# Stop socket conenction
 