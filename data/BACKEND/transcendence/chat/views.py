from django.shortcuts import render

# Create your views here.
def chat_menu(request):
    if not request.user.is_authenticated:
        authenticate(request, username='testuser', password='testpw123')
    context = {}
    return render(request, "chat-menu.html", context)
