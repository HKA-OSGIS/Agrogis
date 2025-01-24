from django.shortcuts import render
import requests
from django.http import JsonResponse

# Create your views here.

# API Key y base URL
API_KEY = "bd68218051d12579e4c9e20b7390dad6"  # Sustituye con tu clave de API
BASE_URL = "https://api.openweathermap.org/data/3.0/onecall"

def get_weather_one_call(request):
    lat = request.GET.get("lat")  # Latitud
    lon = request.GET.get("lon")  # Longitud
    exclude = request.GET.get("exclude", "")  # Datos a excluir (opcional)

    if not lat or not lon:
        return JsonResponse({
            "ok": False,
            "message": "Coordinates 'lat' and 'lon' are required"
        }, status=400)

    params = {
        "lat": lat,
        "lon": lon,
        "exclude": exclude,
        "appid": API_KEY,
        "units": "metric"  # Devuelve los datos en unidades métricas
    }

    response = requests.get(BASE_URL, params=params)

    if response.status_code == 200:
        return JsonResponse(response.json(), safe=False)
    else:
        return JsonResponse({
            "ok": False,
            "message": "Could not fetch weather data",
            "error": response.status_code
        })
