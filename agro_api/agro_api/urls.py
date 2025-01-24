"""
URL configuration for agro_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include #Include is necessary for introduce urls of each kind of app.
from app_plot_managment.viewsUsers import AppLogin, AppLogout  # Asegúrate de importar la vista

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', AppLogin.as_view(), name='login'),
    path('logout/',AppLogout.as_view(),name='logout'),
    path('plots/',include('app_plot_managment.urls')), #Connect the routes of the app
    path('weather/', include('app_weather.urls')), 
    path('agrodata/', include('agrodata.urls')),
]
