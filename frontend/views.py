from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response
from django.template import RequestContext
from rest_framework import generics
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
from models import Hacker
from serializers import HackerSerializer


def render_response(request, *args, **kwargs):
    kwargs['context_instance'] = RequestContext(request)
    return render_to_response(*args, **kwargs)


class HackerDetail(generics.RetrieveUpdateAPIView):
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    slug_field = slug_url_kwarg = 'username'
    model = Hacker
    serializer_class = HackerSerializer

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            kwargs[self.slug_field] = request.user.username
        return super(HackerDetail, self).dispatch(request, *args, **kwargs)


def home(request):
    # from pprint import pprint
    from django.core.cache import cache
    import requests

    TIMEOUT = 2880 * 2

    user = 'qhoxie'
    api_key = settings.API_KEY
    call = 'http://hndroidapi.appspot.com/submitted/format/json/user/%s?appid=hn-heartbeat&callback=&guid=%s' % (
        user, api_key)

    user_cache = cache.get('user_cache')
    if user_cache:
        print user_cache

    r = requests.get(call)
    content = r.json()
    # pprint(content)

    cache.set(
        "user_cache",
        content,
        TIMEOUT
    )

    context = {'STRIPE_PUBLIC_KEY': settings.STRIPE_PUBLIC_KEY}
    return render_response(request, 'base.html', context)
