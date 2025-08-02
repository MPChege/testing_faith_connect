# authapp/serializers.py
from django.contrib.auth import authenticate
from rest_framework import serializers

from user_auth.models import User

from rest_framework_simplejwt.tokens import RefreshToken



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'partnership_number', 'user_type',
            'email', 'phone', 'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 6},
        }

    def validate(self, data):
        email = data.get('email')
        phone = data.get('phone')

        if not email and not phone:
            raise serializers.ValidationError("Either phone or email must be provided.")

        if email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exists.")

        if phone and User.objects.filter(phone=phone).exists():
            raise serializers.ValidationError("Phone number already exists.")

        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    partnership_number = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(partnership_number=data['partnership_number'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid partnership number or password")

        token = RefreshToken.for_user(user)

        return {
            "access": str(token.access_token),
            "refresh": str(token),
            "partnership_number": user.partnership_number,
            "user_type": user.user_type,
            "email": user.email,
            "phone": user.phone,
            "is_active": user.is_active,
        }