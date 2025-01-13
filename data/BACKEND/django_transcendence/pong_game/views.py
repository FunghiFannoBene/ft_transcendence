from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.template.loader import render_to_string

# Create your views here.
def home(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Render only specific blocks based on context flags
        content_html = render_to_string('home.html', {'only_content': True}, request=request)

        return JsonResponse({
            'content': content_html,
        })

    # For a full-page load, render the entire base template
    return render(request, 'base.html')

def access_menu(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Render only specific blocks based on context flags
        content_html = render_to_string('access_menu.html', {'only_content': True}, request=request)

        return JsonResponse({
            'content': content_html,
        })

    # for a full-page load
    return render(request, 'access_menu.html')

def game_menu(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Render only specific blocks based on context flags
        content_html = render_to_string('game_menu.html', {'only_content': True}, request=request)

        return JsonResponse({
            'content': content_html,
        })

    # for a full-page load
    return render(request, 'game_menu.html')
