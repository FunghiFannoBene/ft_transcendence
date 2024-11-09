from django.contrib import admin
from .models import UserProfile, MatchHistory, PlayerMatchDetail

# Registra i modelli nel pannello admin
admin.site.register(UserProfile)
admin.site.register(MatchHistory)
admin.site.register(PlayerMatchDetail)