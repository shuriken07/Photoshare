from api.models import Comment, Post

class CommentService:

    @staticmethod
    def add_comment(data, user):

        if not data.get("comment"):
            raise Exception("Comment is required")
        post = Post.objects.get(id=data["post"])
        comment = Comment.objects.create(
            comment=data["comment"],
            user=user,
            post=post
        )

        return comment

    @staticmethod
    def get_comments(post_id):
        return Comment.objects.filter(
            post_id=post_id
        ).select_related("user").order_by("-createdAt")

    @staticmethod
    def delete_comment(id, user):

        comment = Comment.objects.select_related("post").get(id=id)

        is_comment_owner = comment.user.id == user.id
        is_post_owner = comment.post.user.id == user.id

        if not is_comment_owner and not is_post_owner:
            raise Exception("Unauthorized")

        comment.delete()

    @staticmethod
    def update_comment(id, data, user):

        comment = Comment.objects.select_related("post").get(id=id)

        is_comment_owner = comment.user.id == user.id
        is_post_owner = comment.post.user.id == user.id

        if not is_comment_owner and not is_post_owner:
            raise Exception("Unauthorized")
        
        if not data.get("comment"):
            raise Exception("Comment is required")

        comment.comment = data["comment"]
        comment.save()

        return comment