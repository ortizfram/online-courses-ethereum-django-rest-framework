from apps.category.serializers import CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Category
from rest_framework.pagination import PageNumberPagination


class ListCategoriesView(APIView):
    def get(self, request, format=None):
        if Category.objects.all().exists():
            categories = Category.objects.all()

            result = []

            for category in categories:
                # if not subcategory it's a parent
                if not category.parent:
                    item = {}
                    item['id'] = category.id
                    item['name'] = category.name
                    item['thumbnail'] = category.thumbnail.url

                    # array of subcategories
                    item['sub_categories'] = []

                    for cat in categories:
                        sub_item = {}
                        # id cat  == id subcat
                        if cat.parent and cat.parent.id == category.id:
                            sub_item['id'] = cat.id
                            sub_item['name'] = cat.name
                            sub_item['thumbnail'] = cat.thumbnail.url
                            # fill array
                            item['sub_categories'].append(sub_item)

                    # add all to result
                    result.append(item)
                    
            return Response({'categories': result}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No categories found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)