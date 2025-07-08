from django.urls import path

from app.views import get_all, get_one, change_one, registration, delete_one, AdminFile, get_url_admin

admin_patterns = [
    path('ga', get_all),
    path('g/<int:uid>', get_one),
    path('ch', change_one),
    path('a', registration),
    path('d/<int:uid>', delete_one),
    path('f/<int:fid>', AdminFile.as_view()),
    path('gu/<int:fid>', get_url_admin),

]
