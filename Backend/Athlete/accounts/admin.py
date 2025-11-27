from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, Onboarding

# -----------------------------
# CustomUser Admin
# -----------------------------
class CustomUserAdmin(BaseUserAdmin):
    model = CustomUser
    list_display = ('email', 'full_name', 'role', 'is_staff', 'is_superuser', 'is_active')
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')
    search_fields = ('email', 'full_name')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'full_name', 'password', 'role')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'is_active', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'role', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )

# -----------------------------
# Onboarding Admin
# -----------------------------
class OnboardingAdmin(admin.ModelAdmin):
    list_display = ('user', 'age', 'gender', 'activity_level', 'primary_goals')
    search_fields = ('user__email', 'user__full_name', 'primary_goals')
    list_filter = ('gender', 'activity_level', 'region')

# -----------------------------
# Register models
# -----------------------------
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Onboarding, OnboardingAdmin)
