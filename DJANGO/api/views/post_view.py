from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.parsers import FormParser
from api.middleware.auth import auth_required
from rest_framework.response import Response
from api.services.post_service import PostService
from api.serializers.post_serializer import PostSerializer
from api.models import User


@api_view(["POST"])
@auth_required
@parser_classes([MultiPartParser,FormParser])
def addPost(request):
    user = request.user
    image = request.FILES.get("image")
    if image is None:
        return Response({
            "status": False,
            "message": "Please upload an image"
        }, status=400)
    post = PostService.add_post(
        request.data,
        image,
        user
    )
    serializer = PostSerializer(post)
    return Response({
        "status":True,
        "message":"Post Added",
        "data":serializer.data
    })

@api_view(["GET"])
@auth_required
def getPosts(request):
    page = int(
        request.GET.get("page",1)
    )
    limit = int(
        request.GET.get("limit",3)
    )
    search = request.GET.get(
        "search",
        ""
    )
    data = PostService.get_posts(
        search,
        page,
        limit
    )
    serializer = PostSerializer(
        data["posts"],
        many=True
    )
    return Response({
        "status":True,
        "posts":serializer.data,
        "currentPage":data["currentPage"],
        "totalPages":data["totalPages"]
    })
@api_view(["GET"])
@auth_required
def getPost(request,id):
    post = PostService.get_post(id)
    serializer = PostSerializer(post)
    return Response({
        "status":True,
        "data":serializer.data
    })

@api_view(["PUT"])
@auth_required
@parser_classes([MultiPartParser,FormParser])
def updatePost(request,id):
    image = request.FILES.get("image")
    post = PostService.update_post(
        id,
        request.data,
        image
    )
    serializer = PostSerializer(post)
    return Response({
        "status":True,
        "message":"Updated",
        "data":serializer.data
    })

@api_view(["DELETE"])
@auth_required
def deletePost(request,id):
    PostService.delete_post(
        id,
        request.user
    )
    return Response({
        "status":True,
        "message":"Deleted"
    })