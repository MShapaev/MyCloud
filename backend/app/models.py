from django.db import models
import secrets


# Класс создания таблицы пользователей
class CloudUser(models.Model):
    email = models.CharField(max_length=250)
    password = models.CharField(max_length=250)
    is_admin = models.BooleanField()
    key = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now_add=True)
    last_visit = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return self.email


# Класс создания таблицы данных сессии пользователелей
class UserSession(models.Model):
    session_token = models.CharField(max_length=100, default='')
    created = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(CloudUser, on_delete=models.CASCADE)


# Директория сохранения файлов и аватаров
def user_directory_path(instance, filename):
    try:
        if instance.file:
            return f'user_files/user_{instance.user.id}/{filename}'
    except (Exception, ):
        return f'avatars/user_{instance.user.id}/{secrets.token_hex(12)}'


# Класс создания таблицы данных пользователей
class UserData(models.Model):
    name = models.CharField(max_length=250, default='')
    last_name = models.CharField(max_length=100, default='')
    avatar = models.ImageField(upload_to=user_directory_path, default='')
    user = models.ForeignKey(CloudUser, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Поле данных пользователя'
        verbose_name_plural = 'Данные пользователя'


# Класс создания таблицы файлов пользователей
class UserFiles(models.Model):
    file = models.FileField(upload_to=user_directory_path)
    name = models.CharField(max_length=250)
    comment = models.TextField(default='')
    created = models.DateTimeField(auto_now_add=True)
    last_download = models.DateTimeField(null=True, blank=True)
    size = models.CharField(max_length=250)
    user = models.ForeignKey(CloudUser, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'файл пользователя'
        verbose_name_plural = 'Файлы пользователей'
