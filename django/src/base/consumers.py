from channels.generic.websocket import WebsocketConsumer
from channels.exceptions import StopConsumer

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
        print(message)
        self.send("收到了，老弟")
        #self.close() # This is if server side want to disconnect the client (挥手）)

    def websocket_disconnect(self, message):
        print("websocket_disconnect 被断链接了") # This is printed on the server side when the client disconnects
        raise StopConsumer()# Stop socket conenction
 