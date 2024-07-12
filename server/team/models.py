from django.db import models

MEMBER_ROLES = (
    ('admin', 'admin'),
    ('regular', 'regular'),
)


class Member(models.Model):
    email = models.CharField(max_length=200, unique=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    role = models.CharField(max_length=200, choices=MEMBER_ROLES)
