from django.urls import path
from . import views

# Add your URLs here.
urlpatterns = [
	path('', views.home, name='home'),
    path('access_menu/', views.access_menu, name='access_menu'),
    path('game_menu/', views.game_menu, name='game_menu'),
]
