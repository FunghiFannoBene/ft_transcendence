from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES

class SnippetSerializer(serializers.HyperlinkedModelSerializer):
    highlight = serializers.HyperlinkedIdentityField(view_name="snippet-highlight", format="html")
    owner = serializers.ReadOnlyField(source="owner.username")
    class Meta:
        model = Snippet
        fields = ("id", "title", "code", "linenos", "language", "style", "owner","highlight",)

class UserSerializer(serializers.HyperlinkedModelSerializer):
    snippets = serializers.HyperlinkedRelatedField(many=True, view_name="snippet-detail", queryset=Snippet.objects.all())
    class Meta:
        model = User
        fields = ("url", "id", "username", "snippets")
