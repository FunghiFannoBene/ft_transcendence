import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from chat.connected_users import connected_users

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_box_name = self.scope['url_route']['kwargs']['chat_box_name']
        self.room_group_name = 'chat_%s' % self.chat_box_name
        self.username = self.scope['user'].username  # Supponendo che usi il sistema auth di Django

        # Aggiungi l'utente al dizionario globale degli utenti connessi
        connected_users['global'].add(self.username)

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        # Avvia il ciclo di invio periodico della lista utenti
        self.send_users_task = asyncio.create_task(self.send_users_periodically())

    async def disconnect(self, close_code):
        # Rimuovi l'utente dal dizionario globale degli utenti connessi
        connected_users['global'].discard(self.username)

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        # Ferma il ciclo di invio periodico della lista utenti
        if hasattr(self, 'send_users_task'):
            self.send_users_task.cancel()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['name']
        notification = text_data_json['notification']
        whosent = text_data_json['from']

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
                'from': whosent,
                'notification': notification,
            }
        )

    async def chat_message(self, event):
        message = event['message']
        username = event['username']
        notification = event['notification']
        whosent = event['from']

        # Invia il messaggio a tutti gli utenti connessi
        await self.send(text_data=json.dumps({
            'message': message,
            'name': username,
            'from': whosent,
            'notification': notification,
            'users': list(connected_users['global']),  # Lista di tutti gli utenti connessi globalmente
        }))

    async def send_users_periodically(self):
        while True:
            # Invia la lista degli utenti ogni 5 secondi
            await self.send(text_data=json.dumps({
                'from': 'serverinviousers',
                'users': list(connected_users['global']),
            }))
            await asyncio.sleep(5)
