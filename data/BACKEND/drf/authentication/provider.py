

from allauth.socialaccount.providers.oauth2.views import OAuth2Adapter, OAuth2LoginView, OAuth2CallbackView
from allauth.socialaccount.providers.oauth2.provider import OAuth2Provider
import requests

class FortyTwoOAuth2Adapter(OAuth2Adapter):
    provider_id = 'fortytwo'
    access_token_url = 'https://api.intra.42.fr/oauth/token'
    authorize_url = 'https://api.intra.42.fr/oauth/authorize'
    profile_url = 'https://api.intra.42.fr/v2/me'

    def complete_login(self, request, app, token, **kwargs):
        headers = {'Authorization': f'Bearer {token.token}'}
        response = requests.get(self.profile_url, headers=headers)
        extra_data = response.json()
        return self.get_provider().sociallogin_from_response(request, extra_data)

class FortyTwoEcole(OAuth2Provider):
    id = 'fortytwo'
    name = '42'
    oauth2_adapter_class = FortyTwoOAuth2Adapter  # Ora la classe è definita

    def get_default_scope(self):
        return ['public']
    
    def extract_uid(self, data):
        return str(data['id']) 

provider_classes = [FortyTwoEcole]

class FortyTwoOAuth2LoginView(OAuth2LoginView):
    adapter_class = FortyTwoOAuth2Adapter

class FortyTwoOAuth2CallbackView(OAuth2CallbackView):
    adapter_class = FortyTwoOAuth2Adapter
