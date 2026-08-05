from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.services.like_service import LikeService


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def reactPost(request, postId):

    data = LikeService.react_post(
        postId,
        request.data["reaction"],
        request.user
    )

    return Response({
        "status": True,
        "data": data
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getReactions(request, postId):

    data = LikeService.get_reactions(
        postId,
        request.user
    )

    return Response({
        "status": True,
        "data": data
    })