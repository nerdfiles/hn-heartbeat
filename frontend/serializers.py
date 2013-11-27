# -*- coding: utf-8 -*-

from rest_framework import serializers
from models import Hacker, Heartbeat, Item
from django.core.exceptions import ValidationError


# class ItemSerializer(serializers.RelatedField):
class ItemSerializer(serializers.ModelSerializer):
    '''
        Item Serializer

        Items are User-generated Content which are captured from various APIs
        made available from the Web or Internet via REST consumed endpoints or
        Websites which have been scraped.
    '''

    # read_only = False

    # def from_native(self, data):
    #     new_item = Item(data)
    #     import pdb; pdb.set_trace()  # XXX BREAKPOINT

    def field_from_native(self, data, files, field_name, into):
        try:
            if self.use_files:
                _files = files[field_name]
            else:
                _data = data[field_name]
        except KeyError:
            if getattr(self, 'default', None):
                _data = self.default
            else:
                if getattr(self, 'required', None):
                    raise ValidationError(self.error_messages['required'])
                return

        if type(_data) is list:
            into[field_name] = []
            for item in _data:
                into[field_name].append(self._custom_from_native(item))
        else:
            into[field_name] = self._custom_from_native(_data)

    def _custom_from_native(self, data):
        self._errors = {}
        if data is not None:
            import pdb; pdb.set_trace()  # XXX BREAKPOINT
            attrs = self.restore_fields(data, None)
            attrs = self.perform_validation(attrs)
        else:
            self._errors['non_field_errors'] = ['No input provided']

        if not self._errors:
            return self.restore_object(attrs,
                                       instance=getattr(self, 'object', None))

    class Meta:
        model = Item
        fields = ('id', 'item_title', 'item_karma', 'item_date', 'item_type', )


class HeartbeatSerializer(serializers.ModelSerializer):
    '''
        Heartbeat Serializer

        Items are User-generated Content (USG) containers which are used
        to consolidate normalized User-generated Interactions (USI).
    '''

    # items = ItemSerializer(many=True)
    items = ItemSerializer()

    def restore_object(self, attrs, instance=None):
        for (obj, model) in self.opts.model._meta.get_all_related_objects_with_model():
            field_name = obj.field.related_query_name()
            if field_name in attrs:
                self.init_data[field_name] = attrs.pop(field_name)

        return super(HeartbeatSerializer, self).restore_object(attrs, instance)

    def save(self, save_m2m=True):
        super(HeartbeatSerializer, self).save()

        if getattr(self, 'init_data', None):
            for accessor_name, object_list in self.init_data.items():
                setattr(self.object, accessor_name, object_list)
            self.init_data = {}

        return self.object

    class Meta:
        model = Heartbeat
        fields = ('id', 'items', )
        depth = 1


class HackerAddSerializer(serializers.ModelSerializer):
    '''
        User Serializer

        Each User is stored in the system itself for analysis and signaling.

        We store users such that subsets of user behavior through USG can be
        generated and analyzed.
    '''

    heartbeat = HeartbeatSerializer()

    def _save_heartbeat_data(self):
        heartbeat_data = self.init_data.get('heartbeat', None)
        if heartbeat_data:
            hs = HeartbeatSerializer(instance=self.object.heartbeat,
                                     data=heartbeat_data)
            if hs.is_valid():
                self.object.heartbeat = hs.object
                hs.save()
            else:
                raise Exception(hs.errors)

    def save(self):
        self._save_heartbeat_data()

        password = self.init_data.get('password', None)
        confirm = self.init_data.get('confirm', None)
        if password and password == confirm:
            self.object.set_password(password)

        super(HackerAddSerializer, self).save()
        return self.object

    class Meta:
        model = Hacker
        exclude = ['last_login', 'password',
                   'is_superuser', 'is_staff',
                   'is_active', 'user_permissions',
                   'groups', ]


class HackerGetSerializer(serializers.ModelSerializer):
    '''
        User Serializer (Minimal)

        Each User is stored in the system itself for analysis and signaling.

        We store users such that subsets of user behavior through USG can be
        generated and analyzed.
    '''
    heartbeat = HeartbeatSerializer()

    class Meta:
        model = Hacker
        exclude = ['last_login', 'password',
                   'is_superuser', 'is_staff',
                   'is_active', 'user_permissions',
                   'groups', 'heartbeat', ]
