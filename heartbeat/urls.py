from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns
from frontend.views import HackerDetail

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^$', 'frontend.views.home', name='home'),
                       url(r'^dashboard/', include(admin.site.urls)),
                       )

urlpatterns += patterns('frontend.views',
                        url(r'^api/hacker/$',
                            HackerDetail.as_view(), name='hacker-detail'),
                        )

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'api'])

urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)
