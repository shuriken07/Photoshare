from django.urls import path
from api.views.like_view import *

urlpatterns = [
    path("react/<str:postId>/", reactPost),
    path("getreactions/<str:postId>/", getReactions),
]