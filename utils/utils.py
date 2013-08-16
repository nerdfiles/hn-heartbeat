import datetime
import inspect
from django.db.models.query import QuerySet


class DeleteEachQuerySet(QuerySet):

    '''
    This QuerySet deletes objects separately, so 'delete' method called in each object.
    '''
    def delete(self):
        for obj in self.all():
            obj.delete()


def cached_attribute(func):
    def wrap(self, *args, **kwargs):
        attr_name = '_cached_%s' % func.__name__
        if not hasattr(self, attr_name):
            setattr(self, attr_name, func(self, *args, **kwargs))
        return getattr(self, attr_name)
    return wrap
