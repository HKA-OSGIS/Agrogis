from django.urls import path
from . import views

urlpatterns = [
    path('weather/', views.get_agro_weather, name='get_agro_weather'),
    path('ndvi/', views.get_ndvi_history, name='get_ndvi_history'),
]
