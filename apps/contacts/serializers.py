from rest_framework import serializers 
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    thumbnail=serializers.CharField(source='get_thumbnail')
    class Meta:
        model = Contact
        fields = '__all__'