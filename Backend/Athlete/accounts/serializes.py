from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, Onboarding

class OnboardingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Onboarding
        fields = ['age', 'gender', 'region', 'food_types', 'sports_activities', 'activity_level', 'primary_goals', 'experience_level', 'medical_conditions', 'preferences', 'motivation', 'timeline']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['full_name', 'email', 'password', 'confirm_password', 'role']

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = CustomUser.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), username=email, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials.')
        else:
            raise serializers.ValidationError('Must include email and password.')

        attrs['user'] = user
        return attrs
