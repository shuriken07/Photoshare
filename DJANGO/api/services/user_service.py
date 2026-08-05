from api.models import User
import bcrypt
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from django.conf import settings
import datetime
from datetime import datetime, timedelta, UTC

class UserService:
    
    @staticmethod
    def add_user(data):
        password = bcrypt.hashpw(
                data["password"].encode(),
                bcrypt.gensalt()
                ).decode()
        user = User.objects.create(
            username=data["username"],
            password=password,
            phone=data["phone"],
            email=data["email"],
            gender=data["gender"],
            roles=data.get("roles", []),
            isVerified=data.get("isVerified", False),
            verificationToken=data.get("verificationToken"),
            profilePhoto=data.get("profilePhoto", "")
        )
        return user
    
    @staticmethod
    def get_users():
        return User.objects.all()
    
    @staticmethod
    def get_user(id):
        return User.objects.get(id=id)
    
    @staticmethod
    def update_user(id, data):
        user = User.objects.get(id=id)
        user.username = data.get("username", user.username)
        user.phone = data.get("phone", user.phone)
        user.email = data.get("email", user.email)
        user.gender = data.get("gender", user.gender)
        user.roles = data.get("roles", user.roles)
        user.save()
        return user

    @staticmethod
    def login(data):

        user = User.objects.filter(
            username=data["username"]
        ).first()

        if not user:
            raise Exception("User not found")

        if not bcrypt.checkpw(
            data["password"].encode(),
            user.password.encode()
        ):
            raise Exception("Wrong Password")

        payload = {
            "id": str(user.id),
            "username": user.username,
            "exp": datetime.now(UTC) + timedelta(days=7)
    }

        token = jwt.encode(
            payload,
            settings.JWT_SECRET,
            algorithm=settings.JWT_ALGORITHM
        )

        return {
            "token": token,
            "user": user
        }
    