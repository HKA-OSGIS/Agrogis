from django.urls import path
from . import views,viewsUsers
from .views import BuildingInsert,BuildingUpdate,BuildingDelete,BuildingSelectByGid


urlpatterns = [  
    path('hello/', views.hello_world, name='hello_world'),
    path('not_logged_in/',viewsUsers.notLoggedIn),
    path('app_login/',viewsUsers.AppLogin.as_view()),
    path('app_logout/',viewsUsers.AppLogout.as_view()),
    path('building_insert/', BuildingInsert.as_view(), name='building_insert'),
    path('building_update/', BuildingUpdate.as_view(), name='building_update'),
    path('building_delete/', BuildingDelete.as_view(), name='building_delete'),
    path('building_select/<int:gid>/', BuildingSelectByGid.as_view(), name='building_select'),
]


