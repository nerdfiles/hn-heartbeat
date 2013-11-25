# -*- coding: utf-8 -*-

from rest_framework import serializers
from models import Hacker, Heartbeat, Item


class ItemSerializer(serializers.Serializer):
    '''
        Item Serializer

        Items are User-generated Content which are captured from various APIs
        made available from the Web or Internet via REST consumed endpoints or
        Websites which have been scraped.
    '''
    # pk = serializers.Field()
    item_title = serializers.CharField(max_length=100, required=True)
    item_type = serializers.CharField(max_length=10, required=True)
    item_date = serializers.DateTimeField(required=True)
    item_karma = serializers.IntegerField(required=True)

    # def restore_object(self, attrs, instance=None):
    #     '''
    #     If given a dict of serialized values, create or update model.
    #     '''
    #     if instance is not None:
    #         instance.item_title = attrs.get('item_title', instance.item_title)
    #         instance.item_karma = attrs.get('item_karma', instance.item_karma)
    #         instance.item_type = attrs.get('item_type', instance.item_type)
    #         instance.item_date = attrs.get('item_date', instance.item_date)
    #         return instance

    #     return Item(**attrs)

    class Meta:
        model = Item
        fields = ('item_title', 'item_karma',
                  'item_type', 'item_date', )


class HeartbeatSerializer(serializers.ModelSerializer):
    '''
        Heartbeat Serializer

        Items are User-generated Content (USG) containers which are used
        to consolidate normalized User-generated Interactions (USI).
    '''

    items_queryset = Item.objects.all()
    items = ItemSerializer(items_queryset, many=True)
    # items = serializers.SerializerMethodField('get_items')

    # def get_items(self, obj):
    #     items = obj.items
    #     serializer_context = {
    #         'request': self.context.get('request'),
    #         'heartbeat_id': obj.id
    #     }
    #     serializer = ItemSerializer(items, context=serializer_context)
    #     return serializer.data

    class Meta:
        model = Heartbeat
        fields = ('items',)
        depth = 1


class HackerAddSerializer(serializers.ModelSerializer):
    '''
        User Serializer

        Each User is stored in the system itself for analysis and signaling.

        We store users such that subsets of user behavior through USG can be
        generated and analyzed.
    '''

    # heartbeat_queryset = Heartbeat.objects.all()
    heartbeat = HeartbeatSerializer()

    # def restore_object(self, attrs, instance=None):
    #     '''
    #     If given a dict of serialized values, create or update model.
    #     '''
    #     if instance is not None:
    #         instance.username = attrs.get('username', instance.username)

    #         return instance
    #     return Hacker(**attrs)

    def _save_heartbeat_data(self):
        heartbeat_data = self.init_data.get('heartbeat', None)
        if heartbeat_data:
            hs = HeartbeatSerializer(instance=self.object.heartbeat,
                                     data=heartbeat_data)
            if hs.is_valid():
                # import pdb; pdb.set_trace()  # XXX BREAKPOINT
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
                   'groups', 'heartbeat', ]


class HackerGetSerializer(serializers.ModelSerializer):
    '''
        User Serializer (Minimal)

        Each User is stored in the system itself for analysis and signaling.

        We store users such that subsets of user behavior through USG can be
        generated and analyzed.
    '''
    heartbeat_queryset = Heartbeat.objects.all()
    heartbeat = HeartbeatSerializer(heartbeat_queryset)

    class Meta:
        model = Hacker
        exclude = ['last_login', 'password',
                   'is_superuser', 'is_staff',
                   'is_active', 'user_permissions',
                   'groups', 'heartbeat', ]
