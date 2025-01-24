import requests

class AgroMonitoring:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "http://api.agromonitoring.com/agro/1.0/"

    def get_weather(self, lat, lon):
        endpoint = "weather"
        params = {
            'lat': lat,
            'lon': lon,
            'appid': self.api_key
        }
        response = requests.get(f"{self.base_url}{endpoint}", params=params)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Unable to fetch weather data, status code: {response.status_code}"}

    def get_ndvi(self, polygon_id, start, end):
        endpoint = "ndvi/history"
        params = {
            'polyid': polygon_id,
            'start': start,
            'end': end,
            'appid': self.api_key
        }
        response = requests.get(f"{self.base_url}{endpoint}", params=params)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Unable to fetch NDVI data, status code: {response.status_code}"}
