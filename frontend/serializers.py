from rest_framework import serializers
from models import Hacker, Heartbeat


class HeartbeatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Heartbeat


class HackerSerializer(serializers.ModelSerializer):

    heartbeat = HeartbeatSerializer()

    def _save_heartbeat_data(self):
        heartbeat_data = self.init_data.get('heartbeat', None)
        if heartbeat_data:
            hs = HeartbeatSerializer(
                instance=self.object.heartbeat, data=heartbeat_data)
            if hs.is_valid():
                hs.save()
                self.object.heartbeat = hs.object
                hs.object.create_heartbeat()
            else:
                raise Exception(hs.errors)

    def save(self):
        self._save_heartbeat_data()

        super(HackerSerializer, self).save()
        return self.object

    class Meta:
        model = Hacker
        exclude = ['username', 'last_login', 'is_superuser',
                   'is_staff', 'is_active', 'user_permissions', 'groups']
