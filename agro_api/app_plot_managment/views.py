from django.shortcuts import render
from django.http import JsonResponse

from django.views import View
from .pycode.plotsManagment import Buildings
from .pycode.dbConn import Conn


from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Create your views here.

def hello_world(request):
    return JsonResponse({"message": "Hello, AgroGIS API is running!"})

@method_decorator(csrf_exempt, name='dispatch')
class BuildingInsert(View):
    def post(self, request):
        descripcion = request.POST.get("descripcion")
        geomWkt = request.POST.get("geomWkt")

        print("Descripción recibida:", descripcion)
        print("GeomWKT recibido:", geomWkt)

        conn = Conn()
        b = Buildings(conn)
        return JsonResponse(b.insert(descripcion, geomWkt))

@method_decorator(csrf_exempt, name='dispatch')
class BuildingUpdate(View):
    def post(self, request):
        gid = request.POST.get("gid")
        descripcion = request.POST.get("descripcion")
        geom_wkt = request.POST.get("geomWkt")

        if not gid or not descripcion or not geom_wkt:
            return JsonResponse({"ok": False, "message": "Missing parameters", "data": []}, status=400)

        conn = Conn()
        b = Buildings(conn)
        result = b.update(gid, descripcion, geom_wkt)
        
        return JsonResponse(result)


@method_decorator(csrf_exempt, name='dispatch')
class BuildingDelete(View):
    def post(self, request):
        gid=request.POST["gid"]
        print(gid)
        conn=Conn()
        b=Buildings(conn)
        r=b.delete(gid)
        return JsonResponse(r)



@method_decorator(csrf_exempt, name='dispatch')
class BuildingSelectByGid(View):
    def get(self, request, gid):
        conn = Conn()
        b = Buildings(conn)
        return JsonResponse(b.select(gid))
