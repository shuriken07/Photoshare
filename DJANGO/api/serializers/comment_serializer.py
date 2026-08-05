from rest_framework import serializers
from api.models import Comment

class CommentSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    _id = serializers.SerializerMethodField()
    username = serializers.CharField(source="user.username", read_only=True)
    userId = serializers.CharField(source="user.id", read_only=True)
    postId = serializers.CharField(source="post.id", read_only=True)
    postUserId = serializers.CharField(source="post.user.id", read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "_id",
            "comment",
            "createdAt",
            "username",
            "userId",
            "postId",
            "postUserId",
        ]

    def get_id(self, obj):
        return str(obj.id)

    def get__id(self, obj):
        return str(obj.id)