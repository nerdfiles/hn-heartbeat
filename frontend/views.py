# -*- coding: utf-8 -*-

# from django.conf import settings
from django.contrib import auth
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response
from django.template import RequestContext
from rest_framework import generics, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# from rest_framework.response import Response
from models import Hacker
from serializers import HackerSerializer

# view utils
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

    def pre_save(self, obj):
        password = self.request.DATA.get('password', None)
        conf_password = self.request.DATA.get('confirm_password', None)
        if password and len(password) >= 6 and password == conf_password:
            obj.set_password(password)

        return super(HackerDetail, self).pre_save(obj)


class HackerAdd(generics.CreateAPIView):
    model = Hacker
    serializer_class = HackerSerializer

    __shared_state = {}

    def __init__(self):
        from pprint import pprint
        pprint(dir(self))
        self.__dict__ = self.__shared_state
        self.lastUpdate = None

    # Auth
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.DATA, files=request.FILES)
        if serializer.is_valid():
            password = serializer.init_data.get(
                'password', None) or Hacker.objects.make_random_password()
            serializer.object.set_password(password)

            self.pre_save(serializer.object)
            self.object = serializer.save()
            self.post_save(self.object, created=True)

            _user = auth.authenticate(
                username=self.object.username, password=password)
            auth.login(request, _user)

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED,
                            headers=headers)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def HomeView(request):
    '''
        Landing page view.
    '''
    context = {'CONTEXT': True}
    return render_response(request, 'base.tmpl.haml', context)
