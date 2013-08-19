from django.contrib import admin
from forms import HackerAdminForm
from models import Hacker


_ = lambda s: s


class HackerAdmin(admin.ModelAdmin):
    form = HackerAdminForm
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions'),
                            'classes': ['collapse']}),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    filter_horizontal = ('groups', 'user_permissions')

admin.site.register(Hacker, HackerAdmin)
