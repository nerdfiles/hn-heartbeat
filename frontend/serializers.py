# -*- coding: utf-8 -*-

from rest_framework import serializers
from models import Hacker, Heartbeat, Item
from django.core.exceptions import ValidationError


class NestedManyToManyField(serializers.WritableField):
    '''
        For writing nested, deserialized JSON to items.

        @see http://stackoverflow.com/a/18842609/412244
    '''

    def to_native(self, value):
        serializer = self.Meta.serializer(value.all(), many=True, context=self.context)
        return serializer.data

    def from_native(self, data):
        serializer = self.Meta.serializer(data=data, many=True, context=self.context)
        serializer.is_valid()
        serializer.save()
        return serializer.object

    class Meta:
        serializer = None

class ItemSerializer(serializers.ModelSerializer):
    '''
        Item Serializer

        Items are User-generated Content which are captured from various APIs
        made available from the Web or Internet via REST consumed endpoints or
        Websites which have been scraped.
    '''

    class Meta:
        model = Item
        fields = ('id', 'item_title', 'item_karma', 'item_date', 'item_type', )


class ItemNestedSerializer(NestedManyToManyField):
    '''
        Subclass of NestedManyToManyField to be used with ItemSerializer.
    '''

    class Meta:
        serializer = ItemSerializer


class HeartbeatSerializer(serializers.ModelSerializer):
    '''
        Heartbeat Serializer

        Items are User-generated Content (USG) containers which are used
        to consolidate normalized User-generated Interactions (USI).
    '''

    items = ItemNestedSerializer()

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
