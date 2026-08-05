from django.urls import path
from api.views.comment_view import *

urlpatterns = [
    path("addcomment/", addComment),
    path("getcomments/<str:postId>/", getComments),
    path("deletecomment/<str:id>/", deleteComment),
    path("updatecomment/<str:id>/", updateComment),
]