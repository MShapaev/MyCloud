from django.core.exceptions import ObjectDoesNotExist
# from datetime import datetime, timedelta
from .models import UserSession, UserFiles, UserData


# Проверка токена сессии
def check_auth(request):
    try:
        session = UserSession.objects.get(session_token=request.headers['Authorization'])
        files = UserFiles.objects.filter(user=session.user)
        data = UserData.objects.get(user=session.user)
        return {'auth': True, 'user': session.user, 'files': files, 'data': data, 'session': session}
    except ObjectDoesNotExist:
        return {'auth': False}
    except (Exception, ) as err:
        return err


# Проверка токена сессии админа
def check_auth_admin(request):
    try:
        session = UserSession.objects.get(session_token=request.headers['Authorization'])
        if session.user.is_admin:
            return {'auth': True, }
        else:
            raise ObjectDoesNotExist
    except ObjectDoesNotExist:
        return {'auth': False}
    except (Exception, ) as err:
        return err
