from django.shortcuts import render

# Create your views here.

# views.py

import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .UserSerializer.Serializers import RegisterSerializer, LoginSerializer
from .utils import success_response, error_response
import logging

from rest_framework.permissions import AllowAny

logger = logging.getLogger('user_auth')


# views.py

def mask_sensitive_data(data, sensitive_fields=None):
    sensitive_fields = sensitive_fields or ['password']
    return {
        k: ('****' if k in sensitive_fields else v)
        for k, v in data.items()
    }


class RegisterAPIView(APIView):
    def post(self, request):
        safe_data = mask_sensitive_data(request.data)
        logger.info(f"[REGISTER REQUEST] - {safe_data}")

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            logger.info(f"[REGISTER SUCCESS] - User {user.id}")
            return success_response("User registered successfully", {
                "user_id": user.id,
                "email": user.email,
                "phone": user.phone,
                "user_type": user.user_type,
                "partnerNo": user.partnership_number,
            })

        logger.error(f"[REGISTER ERROR] - {serializer.errors}")
        return error_response("Registration failed", serializer.errors)



class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            logger.info(f"Login successful for partnership: {serializer.validated_data['partnership_number']}")
            return success_response("Login successful", serializer.validated_data)
        return error_response("Login failed", serializer.errors)


