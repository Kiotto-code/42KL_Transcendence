from django.urls import path
from . import views

from app01 import views as app01_views
# from base import views as base_views

urlpatterns = [
    path('', views.home, name='home'),
    path("update_profile/", views.profileUpdateView, name="update_profile"),
    path("settings/", views.settings, name="settings"),
    path('profile/<str:pk>', views.userProfile, name='user_profile'),
    
    # app01_views
    # path('', app01_views.chat, name='chat'),
    # path('send_message/<int:receiver_id>/', app01_views.send_message, name='send_message'),
    # path('chat_history/<int:receiver_id>/', app01_views.chat_history, name='chat_history'),
]