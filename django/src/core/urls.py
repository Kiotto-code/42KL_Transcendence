"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from app01 import views as app01_views
from base import views as base_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('allauth.urls')),
    path('', include('base.urls')),
    path('', include('app01.urls')),
    
    # # base_views
    # path('', base_views.home, name='home'),
    # path("update_profile/", base_views.profileUpdateView, name="update_profile"),
    # path("settings/", base_views.settings, name="settings"),
    # path('profile/<str:pk>', base_views.userProfile, name='user_profile'),
    
    # # app01_views
    # path('chat/', app01_views.chat, name='chat'),
    # path('send_message/<int:receiver_id>/', app01_views.send_message, name='send_message'),
    # path('chat_history/<int:receiver_id>/', app01_views.chat_history, name='chat_history'),

    # path('home/', views.home), #this one useless
    # path('', views.chat),
    # path('chat/', views.chat),
    # path('chat/', views.chat),

]

if settings.DEBUG == True:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
else:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


