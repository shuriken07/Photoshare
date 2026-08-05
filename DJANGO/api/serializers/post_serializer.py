from rest_framework import serializers
from api.models import Post


class PostSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    _id = serializers.SerializerMethodField()
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.CharField(source="user.email", read_only=True)
    userId = serializers.CharField(source="user.id", read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "_id",
            "title",
            "description",
            "image",
            "createdAt",
            "username",
            "email",
            "userId"
        ]

    def get_id(self, obj):
        return str(obj.id)

    def get__id(self, obj):
        return str(obj.id)