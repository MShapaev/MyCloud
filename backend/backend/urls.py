from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include

from app.views import login, logout, is_admin, registration, get_data, File, get_url, change_self_data, get_file
from backend.urls_admin import admin_patterns

urlpatterns = [
    # path('superadmin/', admin.site.urls),
    path('api/li', login),
    path('api/lo', logout),
    path('api/ia', is_admin),
    path('api/reg', registration),
    path('api/ch', change_self_data),
    path('api/gd', get_data),
    path('api/f', File.as_view()),
    path('api/f/<int:fid>', File.as_view()),
    path('api/gu/<int:fid>', get_url),
    path('api/gf/<str:code>', get_file),
    path('a/api/', include(admin_patterns)),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
