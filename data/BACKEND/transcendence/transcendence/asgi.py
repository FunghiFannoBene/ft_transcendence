"""
ASGI config for transcendence project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack # note: middleware for handling authentication in WebSocket connections
from channels.routing import ProtocolTypeRouter, URLRouter # note: used to route different types of connections (HTTP, WebSocket)
# from chat import routing # note: module that contains WebSocket URL routing patterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'transcendence.settings')

# note: routes incoming connections based on their type (HTTP or WebSocket)
application = ProtocolTypeRouter(
    {
        'http' : get_asgi_application() , 
        'websocket' : AuthMiddlewareStack(
            URLRouter(
                routing.websocket_urlpatterns
            )    
        )
    }
)

application = get_asgi_application()
