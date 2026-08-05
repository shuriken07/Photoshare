import jwt

from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from api.models import User


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = request.headers.get("Authorization")
        if not auth:
            return None

        try:
            token = auth.split(" ")[1]
        except IndexError:
            raise AuthenticationFailed("Invalid token")
        try:
            decoded = jwt.decode(
                token,
                settings.JWT_SECRET,
                algorithms=[settings.JWT_ALGORITHM]
            )
            user = User.objects.get(id=decoded["id"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token Expired")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid Token")
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")
        return (user, token)