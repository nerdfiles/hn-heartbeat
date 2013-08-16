from django.shortcuts import render_to_response
from django.conf import settings


def home(request):
    from pprint import pprint
    from django.core.cache import cache
    import requests

    TIMEOUT = 2880 * 2

    user = 'qhoxie'
    api_key = settings.API_KEY
    call = 'http://hndroidapi.appspot.com/submitted/format/json/user/%s?appid=hn-heartbeat&callback=&guid=%s' % (user, api_key)

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

    return render_to_response('base.html')
