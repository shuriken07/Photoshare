from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from api.services.user_service import UserService
from api.serializers.user_serializer import UserSerializer

@api_view(["POST"])
def addUser(request):
    user = UserService.add_user(request.data)

    return Response({
        "status": True,
        "message": "User Added Successfully"
    })

@api_view(["GET"])
def getUsers(request):
    users = UserService.get_users()
    serializer = UserSerializer(users, many=True)
    return Response({
        "status": True,
        "data": serializer.data

    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUser(request, id):
    user = UserService.get_user(id)
    serializer = UserSerializer(user)
    return Response({
        "status": True,
        "data": serializer.data
    })

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUser(request, id):

    user = UserService.update_user(id, request.data)

    serializer = UserSerializer(user)

    return Response({

        "status": True,
        "message": "Updated Successfully",
        "data": serializer.data
    })

@api_view(["POST"])
def login(request):
    data = UserService.login(request.data)
    serializer = UserSerializer(data["user"])
    return Response({
        "status": True,
        "message": "Login Successful",
        "token": data["token"],
        "user": serializer.data
    })