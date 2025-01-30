from django.urls import path
from . import views

# Add your URLs here.
urlpatterns = [
	path('', views.home, name='home'),
    path('login_form/', views.login_form, name='login_form'),
    path('signup_form/', views.signup_form, name='signup_form'),
    path('profile/', views.signup_form, name='profile'),
]
