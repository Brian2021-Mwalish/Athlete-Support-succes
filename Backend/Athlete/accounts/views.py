from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.exceptions import PermissionDenied

from .models import Onboarding, CustomUser
from .serializers import OnboardingSerializer, RegisterSerializer, LoginSerializer


# -----------------------------
# Onboarding View
# -----------------------------
class OnboardingView(generics.CreateAPIView):
    serializer_class = OnboardingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != 'athlete':
            # Raise an exception for unauthorized users
            raise PermissionDenied("Only athletes can submit onboarding data.")
        serializer.save(user=self.request.user)


# -----------------------------
# Register View
# -----------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'email': user.email,
                'full_name': user.full_name,
                'role': user.role
            }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------
# Login View
# -----------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    # Include context so serializers can access request
    serializer = LoginSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'email': user.email,
                'full_name': user.full_name,
                'role': user.role,
                'is_superuser': user.is_superuser
            }
        }, status=status.HTTP_200_OK)
    
    # Debug: log errors for troubleshooting
    print("Login serializer errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
