# -*- coding: utf-8 -*-

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
                       )

urlpatterns += patterns('frontend.views',
                        # url(r'^api/list/hackers/$',
                        #   HackerList.as_view(), name='hacker-list'),
                        url(r'^api/hacker/$',
                            HackerDetail.as_view(), name='hacker-detail'),
                        url(r'^api/hacker/create/$',
                            HackerAdd.as_view(), name='customer-create'),)

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'api'])

urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)
