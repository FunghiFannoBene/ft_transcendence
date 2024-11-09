from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from snippets import views
from django.views.generic import RedirectView


urlpatterns = [
    path("", views.api_root),
    path("snippets/", views.SnippetList.as_view(), name="snippet-list"),
    path("snippets/<int:pk>/", views.SnippetDetail.as_view(), name="snippet-detail"), #primary key = pk, django lo riconosce automaticamente
    path("users/", views.UserList.as_view(), name="user-list"),
    path("users/<int:pk>/", views.UserDetail.as_view(), name="user-detail"),
    path("snippets/<int:pk>/highlight/", views.SnippetHighlight.as_view(), name="snippet-highlight",)
]

urlpatterns = format_suffix_patterns(urlpatterns)
