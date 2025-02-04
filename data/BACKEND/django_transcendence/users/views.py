# from django.shortcuts import render
from users.validators import ValidationError, validate_email, validate_username, validate_password
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import User
from rest_framework.decorators import api_view

# Create your views here.
@ensure_csrf_cookie
def csrf(request):
    return HttpResponse(status=200)

@api_view(['POST'])
def user_login(request):
    #request.user.is_authenticated
    data = request.data
    user = authenticate(request, username=data['username'], password=data['password'])
    if user is not None:
        auth_login(request, user)
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=401)

@api_view(['POST'])
def user_register(request):
    data = request.data
    try:
        validate_email(data['email'])
        validate_username(data['username'])
        validate_password(data['password'])
    except ValidationError as e:
        return JsonResponse({'error': e.message}, status=422)
    user = User.objects.create_user(username=data['username'], email=data['email'], password=data['password'])
    user.save()
    return HttpResponse(status=200)

def user_logout(request):
    auth_logout(request)
    return HttpResponse(status=200)
