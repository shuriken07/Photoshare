from django.urls import path
from api.views.post_view import *
urlpatterns=[
    path("addpost/",addPost),
    path("getposts/",getPosts),
    path("getpost/<str:id>/",getPost),
    path("updatepost/<str:id>/",updatePost),
    path("deletepost/<str:id>/",deletePost),
]