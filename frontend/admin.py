from django.contrib import admin
from .forms import HackerAdminForm, HeartbeatAdminForm, ItemAdminForm
from .models import Hacker, Heartbeat, Item

_ = lambda s: s


class ItemAdmin(admin.ModelAdmin):

    form = ItemAdminForm

    fieldsets = (
        (None, {
            'fields': (
                'title', 'type',
                'posted_date',)}),
    )


class HackerAdmin(admin.ModelAdmin):

    form = HackerAdminForm

    fieldsets = (
        (None, {
            'fields': (
                'username', 'password',
                'email', 'heartbeat',)}),
        (_('Permissions'), {
            'fields': (
                'is_active', 'is_staff',
                'is_superuser', 'groups',
                'user_permissions'),
            'classes': ['collapse']}),
        (_('Important dates'), {
            'fields': (
                'last_login',)}),
    )
    filter_horizontal = ('groups', 'user_permissions')


class HeartbeatAdmin(admin.ModelAdmin):

    form = HeartbeatAdminForm

    fieldsets = (
        (None, {
            'fields': (
                'items',)}),
    )

admin.site.register(Item, ItemAdmin)
admin.site.register(Hacker, HackerAdmin)
admin.site.register(Heartbeat, HeartbeatAdmin)
