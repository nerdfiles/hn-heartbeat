from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone
from utils.utils import DeleteEachQuerySet, cached_attribute

_ = lambda s: s

import logging

l = logging.getLogger('django.db.backends')
l.setLevel(logging.DEBUG)
l.addHandler(logging.StreamHandler())


class HackerManager(BaseUserManager):

    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The given username must be set.')
        now = timezone.now()
        user = self.model(username=username,
                          last_login=now, added_at=now, **extra_fields)

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
    username = models.CharField(max_length=50, unique=True)
    added_at = models.DateTimeField(auto_now_add=True)

    is_staff = models.BooleanField(_('Staff'), default=False,
                                   help_text=_('Designates whether the \
                                           user can log into this admin \
                                           site.'))
    is_active = models.BooleanField(_('Active'), default=True,
                                    help_text=_('Designates whether this \
                                            user should be treated as active. \
                                            Unselect this instead of deleting \
                                            accounts.'))

    heartbeat = models.OneToOneField('Heartbeat', null=True)

    objects = HackerManager()

    def __unicode__(self):
        return unicode(self.username)

    def save(self, *args, **kwargs):
        self.username = self.username.lower()
        return super(Hacker, self).save(*args, **kwargs)

    def delete(self, using=None):
        if self.heartbeat:
            self.heartbeat.delete()

        return super(Hacker, self).delete()
    delete.alters_data = True


class Item(models.Model):
    title = models.CharField(max_length=100, null=True)
    type = models.CharField(max_length=10, null=True)
    posted_date = models.DateTimeField(null=True)
    added_at = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return unicode(self.id)


class Heartbeat(models.Model):

    '''
        A heartbeat is any number of recorded karma points per day.
        Collect all days and karma points per day.
    '''

    ''' JSON POST Example:

    {
        "heartbeat": {
            "items": [
                {
                    "title": "this title",
                    "type": "comment",
                    "karma": "4",
                    "date_posted": "2013-05-01T00:00:00Z"
                },
                {
                    "title": "another title",
                    "type": "post",
                    "karma": "30",
                    "date_posted": "2013-05-01T00:00:00Z"
                },
                {
                    "title": "another title",
                    "type": "comment",
                    "karma": "2",
                    "date_posted": "2013-05-01T00:00:00Z"
                }
            ]
        }
    }

    '''

    items = models.ForeignKey(Item,)
    added_at = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        if hasattr(self, 'hacker'):
            return unicode(self.hacker)
        else:
            return unicode("Orphaned<heartbeat_id:" + str(self.id) + ">")
