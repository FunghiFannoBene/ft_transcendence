from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponseRedirect
from allauth.socialaccount.providers.oauth2.views import (OAuth2LoginView, OAuth2CallbackView,)
from .provider import FortyTwoOAuth2Adapter


# Create your views here.

def email_confirm_redirect(request, key):
    return HttpResponseRedirect(f"{settings.EMAIL_CONFIRM_REDIRECT_BASE_URL}{key}/")
def password_reset_confirm_redirect(request, uidb64, token):
    return HttpResponseRedirect(f"{settings.PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL}{uidb64}/{token}/")

class FortyTwoOAuth2LoginView(OAuth2LoginView):
    adapter_class = FortyTwoOAuth2Adapter
    
class FortyTwoOAuth2CallbackView(OAuth2CallbackView):
    adapter_class = FortyTwoOAuth2Adapter