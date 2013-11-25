from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone
from utils.utils import DeleteEachQuerySet
# from utils.utils import cached_attribute

_ = lambda s: s

import logging

'''
Logging Configuration
'''
l = logging.getLogger('django.db.backends')
l.setLevel(logging.DEBUG)
l.addHandler(logging.StreamHandler())


class HackerManager(BaseUserManager):
    '''
    User Manager

    For creation of users.
    '''

    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The given username must be set.')
        now = timezone.now()
        user = self.model(username=username,
                          last_login=now,
                          added_at=now,
                          **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, **extra_fields):
        u = self.create_user(username, password, **extra_fields)
        u.is_staff = True
        u.is_active = True
        u.is_superuser = True
        u.save(using=self._db)
        return u

    def get_query_set(self):
        return DeleteEachQuerySet(self.model, using=self._db)


class Hacker(AbstractBaseUser, PermissionsMixin):
    '''
    User

    Collected from Social Networking APIs.
    '''

    # Model Properties
    username = models.CharField(max_length=50, unique=True)
    added_at = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(null=True, blank=True)

    is_staff = models.BooleanField(_('Staff'), default=False,
                                   help_text=_('Designates whether the \
                                           user can log into this admin \
                                           site.'))
    is_active = models.BooleanField(_('Active'), default=True,
                                    help_text=_('Designates whether this \
                                            user should be treated as active. \
                                            Unselect this instead of deleting \
                                            accounts.'))

    heartbeat = models.OneToOneField('Heartbeat', null=True, blank=True)

    USERNAME_FIELD = 'username'

    objects = HackerManager()

    def __unicode__(self):
        return unicode(self.username)

    def get_short_name(self):
        return self.username

    def save(self, *args, **kwargs):
        self.username = self.username.lower()
        return super(Hacker, self).save(*args, **kwargs)

    def delete(self, using=None):
        if self.heartbeat:
            self.heartbeat.delete()

        return super(Hacker, self).delete()
    delete.alters_data = True


class Item(models.Model):

    '''
        Consumes Hacker News API.

        And perhaps various other APIs!
    '''

    # Model Properties
    item_title = models.CharField(max_length=100, null=True)
    item_type = models.CharField(max_length=10, null=True)
    item_date = models.DateTimeField(null=True, blank=True)
    item_karma = models.IntegerField(null=True)
    added_at = models.DateTimeField(auto_now_add=True)

    # URL Configuration
    def __unicode__(self):
        return unicode(self.id)


class Heartbeat(models.Model):

    '''
        A heartbeat is any number of recorded karma points per day.
        Collect all days and karma points per day.
    '''

    # Model Properties
    items = models.ManyToManyField(Item,
                                   related_name="beats",
                                   null=True,
                                   blank=True)
    added_at = models.DateTimeField(auto_now_add=True)

    # URL Configuration
    def __unicode__(self):
        if hasattr(self, 'hacker'):
            return unicode(self.hacker)
        else:
            return unicode("Orphaned<heartbeat_id:" + str(self.id) + ">")
