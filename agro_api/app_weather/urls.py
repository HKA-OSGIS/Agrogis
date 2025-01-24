from django.urls import path
from . import views

urlpatterns = [
    path('onecall/', views.get_weather_one_call, name='get_weather_one_call'),
]
