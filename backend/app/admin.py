from django.contrib import admin

from .models import CloudUser, UserData, UserFiles


@admin.register(CloudUser)
class AdminUser(admin.ModelAdmin):
    list_display = ['email', 'id', 'last_visit',]
    list_filter = ['email', 'last_visit',]


@admin.register(UserData)
class AdminUserData(admin.ModelAdmin):
    list_display = ['id', 'name', 'last_name', 'user',]
    list_filter = ['id', 'last_name',]


@admin.register(UserFiles)
class AdminUserFiles(admin.ModelAdmin):
    list_display = ['id', 'file', 'user',]
