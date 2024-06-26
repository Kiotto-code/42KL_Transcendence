from django.urls import re_path
# from base import consumers
from . import consumers

#前面的是路由，后面的是处理函数
websocket_urlpatterns = [
	re_path(r'ws/(?P<group>\w+)/$', consumers.ChatConsumer.as_asgi()),
] # something similar to urlpatterns in urls.py

# base(app)/consumers.py need to be created