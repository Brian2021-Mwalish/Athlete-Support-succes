from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# -----------------------------
# Custom User Manager
# -----------------------------
class CustomUserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name, **extra_fields)
        user.set_password(password)  # Ensures password is hashed
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if not password:
            raise ValueError('Superusers must have a password.')
        return self.create_user(email, full_name, password, **extra_fields)

# -----------------------------
# Custom User Model
# -----------------------------
class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('athlete', 'Athlete'),
        ('coach', 'Coach'),
        ('admin', 'Admin'),
    ]

    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='athlete')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Override groups and permissions to prevent clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email

# -----------------------------
# Onboarding Model
# -----------------------------
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


class WorkoutLog(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='workout_logs')
    date = models.DateField()
    activity_type = models.CharField(max_length=100)
    duration_minutes = models.PositiveIntegerField()
    distance_km = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    calories_burned = models.PositiveIntegerField(null=True, blank=True)
    average_heart_rate = models.PositiveIntegerField(null=True, blank=True)
    max_heart_rate = models.PositiveIntegerField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'date', 'activity_type']

    def __str__(self):
        return f"{self.user.full_name} - {self.activity_type} on {self.date}"


class HealthMetric(models.Model):
    METRIC_TYPES = [
        ('hrv', 'Heart Rate Variability'),
        ('sleep', 'Sleep Hours'),
        ('hydration', 'Hydration %'),
        ('stress', 'Stress Level'),
        ('resting_hr', 'Resting Heart Rate'),
        ('training_load', 'Training Load'),
        ('weight', 'Weight'),
        ('body_fat', 'Body Fat %'),
        ('muscle_mass', 'Muscle Mass'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='health_metrics')
    metric_type = models.CharField(max_length=20, choices=METRIC_TYPES)
    value = models.DecimalField(max_digits=8, decimal_places=2)
    unit = models.CharField(max_length=20, default='')
    date_recorded = models.DateField()
    source = models.CharField(max_length=50, default='manual')  # manual, fitbit, apple_health, etc.
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'metric_type', 'date_recorded']

    def __str__(self):
        return f"{self.user.full_name} - {self.metric_type}: {self.value} {self.unit}"


class NutritionLog(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='nutrition_logs')
    date = models.DateField()
    meal_type = models.CharField(max_length=50)  # breakfast, lunch, dinner, snack
    food_items = models.JSONField(default=list)
    calories = models.PositiveIntegerField()
    protein_g = models.DecimalField(max_digits=6, decimal_places=1, default=0)
    carbs_g = models.DecimalField(max_digits=6, decimal_places=1, default=0)
    fats_g = models.DecimalField(max_digits=6, decimal_places=1, default=0)
    water_ml = models.PositiveIntegerField(default=0)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.full_name} - {self.meal_type} on {self.date}"


class InjuryReport(models.Model):
    SEVERITY_CHOICES = [
        ('minor', 'Minor'),
        ('moderate', 'Moderate'),
        ('severe', 'Severe'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='injury_reports')
    injury_type = models.CharField(max_length=100)
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES)
    description = models.TextField()
    date_occurred = models.DateField()
    recovery_status = models.CharField(max_length=50, default='recovering')
    medical_attention = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.full_name} - {self.injury_type} ({self.severity})"
