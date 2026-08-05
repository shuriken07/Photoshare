from api.models import Post
from django.core.paginator import Paginator

class PostService:
    @staticmethod
    def add_post(data,image,user):
        if not data.get("title") or not data.get("description"):
            raise Exception("Title and Description are required")
        post = Post.objects.create(
            title=data["title"],
            description=data["description"],
            image=image,
            user=user
        )
        return post

    @staticmethod
    def get_posts(search,page,limit):
        posts = Post.objects.select_related("user")
        if search:
            posts = posts.filter(
                title__icontains=search
            )
        posts = posts.order_by("-createdAt")
        paginator = Paginator(
            posts,
            limit
        )
        page_obj = paginator.get_page(page)
        return {
            "posts":page_obj.object_list,
            "currentPage":page,
            "totalPages":paginator.num_pages
        }

    @staticmethod
    def get_post(id):
        return Post.objects.select_related("user").get(id=id)

    @staticmethod
    def update_post(id, data, image, user):
        post = Post.objects.get(id=id)
        if post.user.id != user.id:
            raise Exception("You are not authorized to update this post")
        post.title = data.get("title", post.title)
        post.description = data.get("description", post.description)
        if image:
            if post.image:
                post.image.delete(save=False)
            post.image = image
        post.save()
        return post

    @staticmethod
    def delete_post(id, user):

        post = Post.objects.get(id=id)

        if post.user.id != user.id:
            raise Exception("You are not authorized to delete this post")

        if post.image:
            post.image.delete(save=False)
        post.delete()