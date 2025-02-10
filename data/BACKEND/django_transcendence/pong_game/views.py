from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.template.loader import render_to_string

# Create your views here.
def home(request):
    # if request.user.is_authenticated:
    #     # Redirect authenticated users to the profile page
    #     return HttpResponseRedirect("/profile/")
    # # Render the homepage for unauthenticated users
    # return render(request, "/home/")
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Render only specific blocks based on context flags
        content_html = render_to_string('home.html', {'only_content': True}, request=request)

        return JsonResponse({
            'content': content_html,
        })

    # For a full-page load, render the entire base template
    return render(request, 'base.html')

def pong_game(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Render only specific blocks based on context flags
        content_html = render_to_string('game_menu.html', {'only_content': True}, request=request)

        return JsonResponse({
            'content': content_html,
        })

    # for a full-page load
    return render(request, 'base.html')

# def login_form(request):
#     if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
#         # Render only specific blocks based on context flags
#         content_html = render_to_string('login_form.html', {'only_content': True}, request=request)

#         return JsonResponse({
#             'content': content_html,
#         })

#     # for a full-page load
#     return render(request, 'base.html')

# def signup_form(request):
#     if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
#         # Render only specific blocks based on context flags
#         content_html = render_to_string('signup_form.html', {'only_content': True}, request=request)

#         return JsonResponse({
#             'content': content_html,
#         })

#     # for a full-page load
#     return render(request, 'base.html')

def profile(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Render only specific blocks based on context flags
        content_html = render_to_string('profile.html', {'only_content': True}, request=request)

        return JsonResponse({
            'content': content_html,
        })

    # for a full-page load
    return render(request, 'base.html')
