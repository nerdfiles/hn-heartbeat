# -*- coding: utf-8 -*-

from rest_framework import permissions

class UserPermissions(permissions.BasePermission):
    '''
    Handles permissions for users.  The basic rules are

     - owner may GET, PUT, POST, DELETE
     - nobody else can access
    '''

    def has_object_permission(self, request, view, obj):

        # check if user is owner
        return request.user == obj
