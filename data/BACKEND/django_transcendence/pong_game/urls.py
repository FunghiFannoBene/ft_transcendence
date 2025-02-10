from django.urls import path
from . import views

# Add your URLs here.
urlpatterns = [
	path('', views.home, name='home'),
    path('pong_game/', views.pong_game, name='pong_game'),
    # path('profile/', views.signup_form, name='profile'),
]
