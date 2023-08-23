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

# *** Sorting courses
        if order == 'desc':
            sortBy = '-' + sortBy
            courses = Course.postobjects.order_by(sortBy).all()[:int(limit)]
        elif order == 'asc':
            courses = Course.postobjects.order_by(sortBy).all()[:int(limit)]
        else:
            courses = Course.postobjects.order_by(sortBy).all()
            

        courses = CoursesListSerializer(courses, many=True)

        if courses:
            return Response({'courses': courses.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No courses to list'}, status=status.HTTP_404_NOT_FOUND)


class ListRelatedView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, course_uuid, format=None):
        try:
            product_id = course_uuid
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        
# *** Exists Product Id
        if not Course.postobjects.filter(course_uuid=product_id).exists():
            return Response(
                {'error': 'Product with this product ID does not exist'},
                status=status.HTTP_404_NOT_FOUND)
            
        category = Course.postobjects.get(course_uuid=product_id).category

        if Course.postobjects.filter(category=category).exists():
            # Si la categoria tiene padre filtrar solo por la categoria y no el padre tambien
            if category.parent:
                related_products = Course.postobjects.order_by(
                    '-sold'
                ).filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    related_products = Course.postobjects.order_by(
                        '-sold'
                    ).filter(category=category)
                
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)

                    filtered_categories = tuple(filtered_categories)
                    related_products = Course.postobjects.order_by(
                        '-sold'
                    ).filter(category__in=filtered_categories)
                
            #Excluir producto que estamos viendo
            related_products = related_products.exclude(course_uuid=product_id)
            related_products = CoursesListSerializer(related_products, many=True)

            if len(related_products.data) > 4:
                return Response(
                    {'related_products': related_products.data[:4]},
                    status=status.HTTP_200_OK)
            elif len(related_products.data) > 0:
                return Response(
                    {'related_products': related_products.data},
                    status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'No related products found'},
                    status=status.HTTP_200_OK)
            
        else:
            return Response(
                {'error': 'No related products found'},
                status=status.HTTP_200_OK)


class ListBySearchView(APIView):
    def post(self, request, format=None):
        data = self.request.data

        try:
            category_id = int(data['category_id'])
        except:
            return Response(
                {'error': 'Category ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        
        price_range = data['price_range']
        sort_by = data['sort_by']

        if not (sort_by == 'created' or sort_by == 'price' or sort_by == 'sold' or sort_by == 'name'):
            sort_by = 'created'

        order = data['order']

        # If category ID is 0, then filter by all categories
        if category_id == 0:
            product_results = Course.postobjects.all()
        # Check whether the category ID exists
        elif not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'This category does not exist'},
                status=status.HTTP_404_NOT_FOUND)
        else:
            category = Category.objects.get(id=category_id)

            # If category has a parent, filter only by this category and not the parent as well
            if category.parent:
                product_results = Course.postobjects.filter(category=category)
            else:
                # If this parent category does not have any children categories
                # then just filter by the category itself
                if not Category.objects.filter(parent=category).exists():
                    product_results = Course.postobjects.filter(category=category)
                # If this parent category has children, filter by both the parent category and it's children
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)

                    filtered_categories = tuple(filtered_categories)
                    product_results = Course.postobjects.filter(
                        category__in=filtered_categories)

        # Filter by the price range
        # If data passed for price range isn't equal to one of these cases, then don't filter by price range
        if price_range == '1 - 19':
            product_results = product_results.filter(price__gte=1)
            product_results = product_results.filter(price__lt=20)
        elif price_range == '20 - 39':
            product_results = product_results.filter(price__gte=20)
            product_results = product_results.filter(price__lt=40)
        elif price_range == '40 - 59':
            product_results = product_results.filter(price__gte=40)
            product_results = product_results.filter(price__lt=60)
        elif price_range == '60 - 79':
            product_results = product_results.filter(price__gte=60)
            product_results = product_results.filter(price__lt=80)
        elif price_range == 'More than 80':
            product_results = product_results.filter(price__gte=80)

        # Filter by the order and sort_by
        if order == 'desc':
            sort_by = '-' + sort_by
            product_results = product_results.order_by(sort_by)
        elif order == 'asc':
            product_results = product_results.order_by(sort_by)
        else:
            product_results = product_results.order_by(sort_by)

        # Serialize the product results
        product_results = CoursesListSerializer(product_results, many=True)

        # Check if there were any products found with these filters
        if len(product_results.data) > 0:
            return Response(
                {'filtered_courses': product_results.data},
                status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products found'},
                status=status.HTTP_200_OK)