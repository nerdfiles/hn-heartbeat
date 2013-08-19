from django import forms
from .models import Hacker, Heartbeat, Item


class ItemAdminForm(forms.ModelForm):

    class Meta:
        model = Item
        widgets = {}


class HackerAdminForm(forms.ModelForm):

    class Meta:
        model = Hacker
        widgets = {}


class HeartbeatAdminForm(forms.ModelForm):

    class Meta:
        model = Heartbeat
        widgets = {}
