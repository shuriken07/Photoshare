import jwt
from django.conf import settings
from functools import wraps
from rest_framework.response import Response
from api.models import User

def auth_required(view_func):
    @wraps(view_func)
    def wrapper(request,*args,**kwargs):
        header = request.headers.get("Authorization")
        if not header:
            return Response({
                "message":"No Token"
            },status=401)
        try:
            token = header.split(" ")[1]
            decoded = jwt.decode(
                token,
                settings.JWT_SECRET,
                algorithms=[settings.JWT_ALGORITHM]
            )
            request.user = User.objects.get(
                id=decoded["id"]
            )
        except Exception:
            return Response({
                "message":"Invalid Token"
            },status=401)
        return view_func(request,*args,**kwargs)
    return wrapper