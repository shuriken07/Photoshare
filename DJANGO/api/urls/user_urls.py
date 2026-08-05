from django.urls import path
from api.views.user_view import *
urlpatterns = [
    path("adduser/", addUser),
    path("getusers/", getUsers),
    path("getuser/<str:id>/", getUser),
    path("updateuser/<str:id>/", updateUser),
    path("login/", login),
]