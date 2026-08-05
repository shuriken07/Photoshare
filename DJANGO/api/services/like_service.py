from api.models import Like, Post


class LikeService:

    @staticmethod
    def react_post(post_id, reaction, user):

        if reaction not in ["like", "dislike"]:
            raise Exception("Invalid Reaction")

        post = Post.objects.get(id=post_id)

        existing = Like.objects.filter(
            user=user,
            post=post
        ).first()

        if not existing:

            Like.objects.create(
                user=user,
                post=post,
                reaction=reaction
            )

        else:

            if existing.reaction == reaction:
                existing.delete()

            else:
                existing.reaction = reaction
                existing.save()

        return LikeService.get_reactions(post_id, user)

    @staticmethod
    def get_reactions(post_id, user):

        post = Post.objects.get(id=post_id)

        likes = Like.objects.filter(
            post=post,
            reaction="like"
        ).count()

        dislikes = Like.objects.filter(
            post=post,
            reaction="dislike"
        ).count()

        mine = Like.objects.filter(
            post=post,
            user=user
        ).first()

        return {
            "likes": likes,
            "dislikes": dislikes,
            "myReaction": mine.reaction if mine else None
        }