from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns
from frontend.views import HackerDetail, HackerAdd

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^$', 'frontend.views.HomeView', name='home'),
                       url(r'^dashboard/', include(admin.site.urls)),
                       url(r'^dashboard.links/$',
                           'frontend.views.all_urls_view', name='dashboard-links'),
                       )

urlpatterns += patterns('frontend.views',
                        # url(r'^api/list/hackers/$',
                        #   HackerList.as_view(), name='hacker-list'),
                        url(r'^api/create/$',
                            HackerAdd.as_view(), name='hacker-create'),
                        url(r'^api/hacker/(?P<username>[\w]+)/$',
                            HackerDetail.as_view(), name='hacker-detail'),)

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'api'])

urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)
