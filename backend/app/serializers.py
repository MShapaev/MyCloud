from rest_framework import serializers
from .models import CloudUser, UserData, UserFiles, UserSession


class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFiles
        fields = '__all__'
