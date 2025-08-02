from rest_framework.permissions import BasePermission

class IsBusinessUser(BasePermission):
    """
    Allows access only to users with user_type 'business'.
    """

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.user_type == 'business'
        )
