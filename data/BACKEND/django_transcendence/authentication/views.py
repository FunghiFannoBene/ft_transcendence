from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_protect  # Import csrf_protect
from django.contrib.auth import authenticate, login, logout

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

# Create your views here.
# @csrf_protect
# def custom_login_view(request):
#     if request.method == "GET":
#         if request.user.is_authenticated:
#             return HttpResponseRedirect("profile")
#         return render(request, "login_form")
#     elif request.method == "POST":
#         username = request.POST.get("username", "").strip()
#         password = request.POST.get("password", "")
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return HttpResponseRedirect("login_form")
#         else:
#             return render(request, "login_form", {"error": "Invalid username or password"})

#     return JsonResponse({"error": "Method not allowed"}, status=405)

# @csrf_protect
# def custom_logout_view(request):
#     if request.method == "POST":
#         logout(request)  # Effettua il logout dell'utente
#         return HttpResponseRedirect("/")  # Redirect alla homepage o altra pagina
#     else:
#         return JsonResponse({"error": "Method not allowed"}, status=405)

# @csrf_protect
@api_view(["POST"])
def custom_login_view(request):
    """
    Login user using username and password via a POST request.
    Returns a success message with a status code if authenticated, else an error.
    """
    if request.method == "POST":
        username = request.data.get("username", "").strip()
        password = request.data.get("password", "")
        
        # Authenticate user
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)  # Login the user
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# @csrf_protect
@api_view(["POST"])
def custom_logout_view(request):
    """
    Logout user by invalidating the session via a POST request.
    Returns a success message.
    """
    if request.method == "POST":
        logout(request)  # Log out the user
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    
    return Response({"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
