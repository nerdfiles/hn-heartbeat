from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^$', 'frontend.views.home', name='home'),
                       # url(r'^heartbeat/', include('heartbeat.foo.urls')),
                       # url(r'^dashboard/doc/',
                       # include('django.contrib.admindocs.urls')),
                       url(r'^dashboard/', include(admin.site.urls)),
                       url(r'^api/', include('rest_framework.urls', namespace='rest_framework')),
                       )

urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)
