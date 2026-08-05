from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.services.comment_service import CommentService
from api.serializers.comment_serializer import CommentSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addComment(request):

    comment = CommentService.add_comment(
        request.data,
        request.user
    )

    serializer = CommentSerializer(comment)

    return Response({
        "status": True,
        "data": serializer.data
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getComments(request, postId):

    comments = CommentService.get_comments(postId)

    serializer = CommentSerializer(
        comments,
        many=True
    )

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteComment(request, id):

    CommentService.delete_comment( id, request.user )

    return Response({
        "status": True,
        "message": "Deleted"
    })

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateComment(request, id):

    comment = CommentService.update_comment(
        id,
        request.data,
        request.user
    )

    serializer = CommentSerializer(comment)

    return Response({
        "status": True,
        "message": "Comment Updated",
        "data": serializer.data
    })