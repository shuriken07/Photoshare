from django.db import models
class User(models.Model):
    username = models.CharField(
        max_length=100,
        unique=True
    )
    password = models.CharField(
        max_length=255
    )
    phone = models.CharField(
        max_length=10
    )
    email = models.EmailField(
        unique=True
    )
    gender = models.CharField(
        max_length=10,
        choices=[
            ("Male","Male"),
            ("Female","Female"),
            ("Other","Other")
        ]
    )
    roles = models.JSONField(default=list)
    isVerified = models.BooleanField(default=False)
    verificationToken = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )
    profilePhoto=models.ImageField(
        upload_to="profile/",
        blank=True,
        null=True
    )

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False
    def __str__(self):
        return self.username