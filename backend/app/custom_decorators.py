from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from .cloud_auth import check_auth, check_auth_admin


# Декоратор для входа в систему
def user_not_auth(f):
    def wrapped(*args, **kwargs):
        try:
            response = f(*args, **kwargs)
            return response
        except ObjectDoesNotExist:
            return Response({'error': 'does not exist'}, status=404)
        except (Exception, ) as err:
            return Response({'error': f'{err}'}, status=500)
    return wrapped


# ПОЛЬЗОВАТЕЛЬ
# Декоратор всех запросов с проверкой токена сессии и возвратом данных пользователя в функцию
def user_auth(f):
    def wrapped(*args, **kwargs):
        try:
            data = check_auth(*args, **kwargs)
            kwargs['data'] = data
            if data['auth']:
                response = f(*args, **kwargs)
                return response
            elif not data['auth']:
                return Response({'error': 'not authorized'}, status=403)
            else:
                return Response({'error': data}, status=500)
        except (Exception, ) as err:
            return Response({'error': f'{err}'}, status=500)
    return wrapped


# АДМИН
# Декоратор всех запросов с проверкой токена сессии и флага администратора
def admin_auth(f):
    def wrapped(*args, **kwargs):
        try:
            data = check_auth_admin(*args, **kwargs)
            if data['auth']:
                response = f(*args, **kwargs)
                return response
            elif not data['auth']:
                return Response({'error': 'not authorized'}, status=403)
            else:
                return Response({'error': data}, status=500)
        except ObjectDoesNotExist:
            return Response({'error': 'not found'}, status=400)
        except (Exception, ) as err:
            return Response({'error': f'{err}'}, status=500)
    return wrapped
