from django.urls import path
from chat.consumers import ChatConsumer

websocket_urlpatterns = [
    path('<str:chat_box_name>/', ChatConsumer.as_asgi()) , 
]
