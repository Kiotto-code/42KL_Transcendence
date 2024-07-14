from django.urls import path
from . import views

urlpatterns = [
    # path('', views.chat, name='chat'),
    path('chat/', views.chat, name='chat'),
    path('friendchat/', views.friendchat, name='friendchat'),
    path('send_message/<int:receiver_id>/', views.send_message, name='send_message'),
    path('chat_history/<int:receiver_id>/', views.chat_history, name='chat_history'),
]
