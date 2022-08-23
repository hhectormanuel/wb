from django.contrib.auth.models import User
def get_followers(self):
    followers = []
    for usuario in User.objects.all():
        for follow in usuario.follows.all():
            if follow == self.user:
                #follow me sigue
                followers.append(follow.username)
    return followers