from user.models import UserExtend

class Posts():
    def iterador(follows, followUsers, followPosts):
        for followUser in follows:
            followUsers.append(followUser)

        for user in followUsers:
            for post in user.post_set.all():
                followPosts.append(post)
        postid = []
        for post in followPosts:
            postid.append(post.id)

        array = []
        most_recently = list(reversed(sorted(postid)))
        for most in most_recently:
            for post in followPosts:
                if post.id == most and post.id not in array:
                    array.append(post)

        return array

    def get_data(self, request):
        userExtend = UserExtend.objects.get(user=request.user)
        follows = userExtend.follows.all()
        followUsers =[]
        followPosts = []

        return follows, followUsers, followPosts
    



    