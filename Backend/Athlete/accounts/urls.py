from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('me/', views.current_user_view, name='current_user'),
    path('onboarding/', views.OnboardingView.as_view(), name='onboarding'),
]
