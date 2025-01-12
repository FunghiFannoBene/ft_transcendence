from django.shortcuts import render
from .models import Friend

# Create your views here.

def user_profile(request):
    friends = Friend.objects.all()  # Adjust the query as needed
    return render(request, 'user-profile.html', {'friends': friends})
