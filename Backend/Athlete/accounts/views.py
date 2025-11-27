from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Onboarding
from .serializes import OnboardingSerializer

class OnboardingView(generics.CreateAPIView):
    serializer_class = OnboardingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != 'athlete':
            return Response({"error": "Only athletes can submit onboarding data."}, status=status.HTTP_403_FORBIDDEN)
        serializer.save(user=self.request.user)
