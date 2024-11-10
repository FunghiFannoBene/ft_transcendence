from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView
from .models import UserProfile, PlayerMatchDetail, MatchHistory
from .serializers import UserProfileSerializer, PlayerMatchDetailSerializer, MatchHistorySerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .permissions import IsOwner
# Create your views here.

class UserProfileView(RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Elimina l'utente associato
        instance.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PlayerMatchDetailView(RetrieveAPIView):
    queryset = PlayerMatchDetail.objects.all()
    serializer_class = PlayerMatchDetailSerializer
    permission_classes = [IsAuthenticated]
    
class MatchHistoryView(ListAPIView):
    queryset = MatchHistory.objects.all()
    serializer_class = MatchHistorySerializer
    permission_classes = [IsAuthenticated]
    

#admin
    
class UserProfileAdminView(RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAdminUser]

class PlayerMatchDetailAdminView(RetrieveUpdateDestroyAPIView):
    queryset = PlayerMatchDetail.objects.all()
    serializer_class = PlayerMatchDetailSerializer
    permission_classes = [IsAdminUser]

