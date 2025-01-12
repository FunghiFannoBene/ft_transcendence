from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.template.loader import render_to_string
from django.utils import translation

# Create your views here.
def home(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Render only specific blocks based on context flags
        content_html = render_to_string('pong/home.html', {'only_content': True}, request=request)
        footer_html = render_to_string('pong/home.html', {'only_footer': True}, request=request)
        opening_html = render_to_string('pong/home.html', {'only_opening': True}, request=request)

        return JsonResponse({
            'content': content_html,
            'footer': footer_html,
            'opening': opening_html,
        })

    # For a full-page load, render the entire base template
    return render(request, 'pong/base.html')

def access_menu(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Render only specific blocks based on context flags
        content_html = render_to_string('pong/access_menu.html', {'only_content': True}, request=request)
        footer_html = render_to_string('pong/access_menu.html', {'only_footer': True}, request=request)
        opening_html = render_to_string('pong/access_menu.html', {'only_opening': True}, request=request)

        return JsonResponse({
            'content': content_html,
            'footer': footer_html,
            'opening': opening_html,
        })

    # For a full-page load, render the entire base template
    return render(request, 'pong/access_menu.html')

def game_menu(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Render only specific blocks based on context flags
        content_html = render_to_string('pong/game_menu.html', {'only_content': True}, request=request)
        footer_html = render_to_string('pong/game_menu.html', {'only_footer': True}, request=request)
        opening_html = render_to_string('pong/game_menu.html', {'only_opening': True}, request=request)

        return JsonResponse({
            'content': content_html,
            'footer': footer_html,
            'opening': opening_html,
        })

    # For a full-page load, render the entire base template
    return render(request, 'pong/base.html')

def user_profile(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Render only specific blocks based on context flags
        content_html = render_to_string('pong/user_profile.html', {'only_content': True}, request=request)
        footer_html = render_to_string('pong/user_profile.html', {'only_footer': True}, request=request)
        opening_html = render_to_string('pong/user_profile.html', {'only_opening': True}, request=request)

        return JsonResponse({
            'content': content_html,
            'footer': footer_html,
            'opening': opening_html,
        })

    # For a full-page load, render the entire base template
    return render(request, 'pong/base.html')
