from django.urls import path
from .views import UserProfileView, PlayerMatchDetailView, MatchHistoryView, PlayerMatchDetailAdminView

urlpatterns = [
    path("user-profile/", UserProfileView.as_view(), name="user-profile"),
    path("match-history/", MatchHistoryView.as_view(), name="match-history"),
    path("player-match/", PlayerMatchDetailView.as_view(), name="player-match"),
    path("manage-match",  PlayerMatchDetailAdminView.as_view(), name="manage-match")
]