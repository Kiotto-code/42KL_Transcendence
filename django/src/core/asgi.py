"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter

# from core import routing
from . import routing # import routing.py -> websocket_urlpatterns 【URLRouter(routing.websocket_urlpatterns)】

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# application = get_asgi_application() # This is the default ASGI application. Only handle Http Convention


application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(), # Django ASGI application, auto find urls.py
        "websocket": URLRouter(routing.websocket_urlpatterns), # routings(urls.py), consumers(views.py)
    }
)
