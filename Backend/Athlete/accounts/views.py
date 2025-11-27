from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import authenticate

# Import your models
from .models import (
    Onboarding, CustomUser,
    WorkoutLog, HealthMetric,
    NutritionLog, InjuryReport
)

# Import your serializers
from .serializers import (
    OnboardingSerializer, RegisterSerializer, LoginSerializer,
    WorkoutLogSerializer, HealthMetricSerializer,
    NutritionLogSerializer, InjuryReportSerializer
)

# -----------------------------
# Onboarding View
# -----------------------------
class OnboardingView(generics.RetrieveUpdateAPIView):
    serializer_class = OnboardingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return Onboarding.objects.get(user=self.request.user)

    def perform_create(self, serializer):
        if self.request.user.role != 'athlete':
            raise PermissionDenied("Only athletes can submit onboarding data.")
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        if self.request.user.role != 'athlete':
            raise PermissionDenied("Only athletes can update onboarding data.")
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
                'name': user.full_name,
                'role': user.role,
                'is_superuser': user.is_superuser
            }
        }, status=status.HTTP_200_OK)

    print("Login serializer errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------
# Current User View
# -----------------------------
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_user_view(request):
    user = request.user
    return Response({
        'id': user.id,
        'email': user.email,
        'name': user.full_name,
        'role': user.role,
        'is_superuser': user.is_superuser
    }, status=status.HTTP_200_OK)


# -----------------------------
# Workout Log Views
# -----------------------------
class WorkoutLogListCreateView(generics.ListCreateAPIView):
    serializer_class = WorkoutLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkoutLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WorkoutLogDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WorkoutLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkoutLog.objects.filter(user=self.request.user)


# -----------------------------
# Health Metric Views
# -----------------------------
class HealthMetricListCreateView(generics.ListCreateAPIView):
    serializer_class = HealthMetricSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return HealthMetric.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class HealthMetricDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = HealthMetricSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return HealthMetric.objects.filter(user=self.request.user)


# -----------------------------
# Nutrition Log Views
# -----------------------------
class NutritionLogListCreateView(generics.ListCreateAPIView):
    serializer_class = NutritionLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return NutritionLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class NutritionLogDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NutritionLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return NutritionLog.objects.filter(user=self.request.user)


# -----------------------------
# Injury Report Views
# -----------------------------
class InjuryReportListCreateView(generics.ListCreateAPIView):
    serializer_class = InjuryReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return InjuryReport.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class InjuryReportDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = InjuryReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return InjuryReport.objects.filter(user=self.request.user)
