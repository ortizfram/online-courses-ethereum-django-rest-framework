from django.shortcuts import render, get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .models import Post, Category
from .serializers import PostSerializer
from .pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination

from django.db.models.query_utils import Q


class BlogListView(APIView):
    # return posts as JSON
    def get(self, request, format=None):
        if Post.postobjects.all().exists():

            posts= Post.postobjects.all()

            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(posts, request)
            serializer = PostSerializer(results, many=True)

            return paginator.get_paginated_response({'posts': serializer.data})
        else: 
            return Response({'error':'No posts Found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

class BlogListCategoryView(APIView):
    # return posts as JSON
    def get(self, request,category_id, format=None):
        if Post.postobjects.all().exists():
            
            category = Category.objects.get(id=category_id)

            posts= Post.postobjects.all().filter(category=category)

            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(posts, request)
            serializer = PostSerializer(results, many=True)

            return paginator.get_paginated_response({'posts': serializer.data})
        else: 
            return Response({'error':'No posts Found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

class PostDetailView(APIView):
    def get(self, request, post_slug, format=None):
        post =          get_object_or_404(Post, slug=post_slug)
        serializer =    PostSerializer(post)
        return Response({'post':serializer.data}, status=status.HTTP_200_OK)

class SearchBlogView(APIView):
     def get(self,request,search_term):
         matches= Post.postobjects.filter(
             Q(title__icontains=search_term) |
             Q(description__icontains=search_term) |
             Q(category__name__icontains=search_term) 
         )

         paginator = MediumSetPagination()
         # results
         serializer = PostSerializer(matches, many=True)
         return Response({'filtered_posts':serializer.data}, status=status.HTTP_200_OK)