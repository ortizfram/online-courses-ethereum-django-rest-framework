from django.core.exceptions import ValidationError
from apps.user.models import  UserAccount
from apps.courses.serializers import UserCoursesLibrary

from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser

from django.core.cache import cache

from django.core.mail import send_mail

from .pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination

from django.shortcuts import get_object_or_404
from django.http.response import HttpResponseBadRequest, HttpResponseNotAllowed
from django.db.models.query_utils import Q
from .models import *
from .serializers import *
import json
from apps.category.models import Category


class CoursesHomeView(APIView):
    def get(self, request, format=None):

        sortBy = request.query_params.get('sortBy')
        if not (sortBy == 'created' or sortBy == 'price' or sortBy == 'sold' or sortBy == 'title') :
            sortBy = 'created'

        order =  request.query_params.get('order')
        limit =  request.query_params.get('limit')

        if not limit :
            limit = 20

        if order == 'desc':
            sortBy = '-' + sortBy
            courses = Course.postobjects.order_by(sortBy).all()[:int(limit)]
        elif order == 'asc':
            courses = Course.postobjects.order_by(sortBy).all()[:int(limit)]
        else:
            courses = Course.postobjects.order_by(sortBy).all()
            

        courses = CoursesListSerializer(courses, many=True)