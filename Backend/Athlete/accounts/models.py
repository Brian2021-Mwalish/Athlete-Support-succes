from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, full_name, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('athlete', 'Athlete'),
        ('coach', 'Coach'),
    ]

    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='athlete')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email

class Onboarding(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='onboarding')
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=20, choices=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
        ('prefer-not-to-say', 'Prefer not to say'),
    ])
    region = models.CharField(max_length=255)
    food_types = models.JSONField(default=list)  # Array of strings
    sports_activities = models.JSONField(default=list)  # Array of strings
    activity_level = models.CharField(max_length=20, choices=[
        ('sedentary', 'Sedentary'),
        ('moderate', 'Moderate'),
        ('active', 'Active'),
        ('very-active', 'Very Active'),
    ])
    primary_goals = models.JSONField(default=list)  # Array of strings
    experience_level = models.CharField(max_length=20, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ])
    medical_conditions = models.TextField(blank=True)
    preferences = models.TextField(blank=True)
    motivation = models.TextField(blank=True)
    timeline = models.CharField(max_length=20, choices=[
        ('short-term', 'Short-term (weeks)'),
        ('medium-term', 'Medium-term (months)'),
        ('long-term', 'Long-term (year+)'),
    ])

    def __str__(self):
        return f"Onboarding for {self.user.email}"
