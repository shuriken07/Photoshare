from rest_framework import serializers
from api.models import User


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    _id = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = "__all__"

    def get_id(self, obj):
        return str(obj.id)

    def get__id(self, obj):
        return str(obj.id)