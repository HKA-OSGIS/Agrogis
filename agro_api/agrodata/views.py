from django.shortcuts import render
import requests
from django.http import JsonResponse
from .pycode.agromonitoring import AgroMonitoring

# Clave de API de AgroMonitoring
API_KEY = "a597344f0250c0b03aaa704f7ec99eaf"

# Instancia de la clase AgroMonitoring
agro_api = AgroMonitoring(API_KEY)

# Obtener datos del clima
def get_agro_weather(request):
    lat = request.GET.get("lat")
    lon = request.GET.get("lon")

    if not lat or not lon:
        return JsonResponse({"ok": False, "message": "Latitude and Longitude are required"}, status=400)

    weather_data = agro_api.get_weather(lat, lon)
    return JsonResponse(weather_data, safe=False)

# Obtener datos de NDVI
def get_ndvi_history(request):
    polygon_id = request.GET.get("polygon_id")
    start = request.GET.get("start")
    end = request.GET.get("end")

    if not polygon_id or not start or not end:
        return JsonResponse({"ok": False, "message": "polygon_id, start, and end are required"}, status=400)

    ndvi_data = agro_api.get_ndvi(polygon_id, start, end)
    return JsonResponse(ndvi_data, safe=False)
