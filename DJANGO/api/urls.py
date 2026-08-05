from django.urls import path, include

urlpatterns = [

    path("user/", include("api.urls.user_urls")),

    path("post/", include("api.urls.post_urls")),

    path("comment/", include("api.urls.comment_urls")),

    path("like/", include("api.urls.like_urls")),

]