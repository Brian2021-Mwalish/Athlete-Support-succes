from rest_framework import serializers
from django.contrib.auth import authenticate

# Import ALL models used in serializers
from .models import (
    CustomUser,
    Onboarding,
    WorkoutLog,
    HealthMetric,
    NutritionLog,
    InjuryReport
)


# -----------------------------
# Onboarding Serializer
# -----------------------------
class OnboardingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Onboarding
        fields = [
            'age',
            'gender',
            'region',
            'food_types',
            'sports_activities',
            'activity_level',
            'primary_goals',
            'experience_level',
            'medical_conditions',
            'preferences',
            'motivation',
            'timeline'
        ]


# -----------------------------
# Registration Serializer
# -----------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['full_name', 'email', 'password', 'confirm_password', 'role']

    def validate(self, attrs):
        # Password match check
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})

        # Prevent admin registration
        if attrs.get('role') == 'admin':
            raise serializers.ValidationError({"role": "Admin registration is not allowed."})

        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = CustomUser.objects.create_user(**validated_data)
        return user


# -----------------------------
# Login Serializer
# -----------------------------
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(
                request=self.context.get('request'),
                username=email,
                password=password
            )
            if not user:
                raise serializers.ValidationError({"non_field_errors": ["Invalid email or password."]})
        else:
            raise serializers.ValidationError({"non_field_errors": ["Email and password are required."]})

        attrs['user'] = user
        return attrs


# -----------------------------
# Workout Log Serializer
# -----------------------------
class WorkoutLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutLog
        fields = [
            'id', 'date', 'activity_type', 'duration_minutes', 'distance_km',
            'calories_burned', 'average_heart_rate', 'max_heart_rate',
            'notes', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


# -----------------------------
# Health Metric Serializer
# -----------------------------
class HealthMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthMetric
        fields = [
            'id', 'metric_type', 'value', 'unit', 'date_recorded',
            'source', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


# -----------------------------
# Nutrition Log Serializer
# -----------------------------
class NutritionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = NutritionLog
        fields = [
            'id', 'date', 'meal_type', 'food_items', 'calories', 'protein_g',
            'carbs_g', 'fats_g', 'water_ml', 'notes', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


# -----------------------------
# Injury Report Serializer
# -----------------------------
class InjuryReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = InjuryReport
        fields = [
            'id', 'injury_type', 'severity', 'description', 'date_occurred',
            'recovery_status', 'medical_attention', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
