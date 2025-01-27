from .dbConn import Conn

"""
{'ok':true,'message':f'Edificios insertados: {n}','data': [[]]}

"""
from .geometryUtils import checkIntersection

class Buildings():
    conn:Conn
    def __init__(self,conn:Conn):
        self.conn=conn

    def insert(self,descripcion, geomWkt)->int:
        print('Iniciando')
        print(geomWkt)
        #r=checkIntersection('d.buildings',geomWkt,25830)
        #if r:
        #    return {'ok':False,'message':'El edificio intersecta con otro','data':[]}

        print('Despues del check')
        q ="insert into d.plots (descripcion,area, geom) values (%s,st_area(st_geometryfromtext(%s,25830)),st_geometryfromtext(%s,25830)) returning gid, area"
        self.conn.cursor.execute(q,[descripcion,geomWkt, geomWkt])
        self.conn.conn.commit()
        r=self.conn.cursor.fetchall()#something like this: [(2,236.6)].
                #fetchall() emties the cursor. If you execute fetchall() twice you will get
                #an empty list []
        print("---",r)
        gid = r[0][0]
        area = r[0][1]
        return {'ok':True,'message':f'Plot Inserted. gid: {gid}','data':[{"gid":gid, "area":area}]}
     
     
    def update(self,gid, descripcion, geomWkt)->int:
        q ="update d.plots set (descripcion,area, geom) = (%s,st_area(st_geometryfromtext(%s,25830)),st_geometryfromtext(%s,25830)) where gid = %s"
        self.conn.cursor.execute(q,[descripcion,geomWkt, geomWkt, gid])
        self.conn.conn.commit()
        n = self.conn.cursor.rowcount
        if n == 0:
            return {'ok':False,'message':f'Cero edificios actualizados','data':[[0]]}
        elif n==1:
            return {'ok':True,'message':f'Plot Updated. Filas afectadas: {n}','data':[[n]]}
        elif n > 1:
            return {'ok':False,'message':f'Demasiados edificios actualizados. Filas afectadas: {n}','data':[[n]]}
        
    def delete(self, gid: int) -> int:
        print(f"Deleting building with gid: {gid}")  # Verificar el valor recibido
        q = "DELETE FROM d.plots WHERE gid = %s"
        self.conn.cursor.execute(q, [gid])
        self.conn.conn.commit()
        n = self.conn.cursor.rowcount
        print(f"Rows affected: {n}")  # Verificar la cantidad de filas afectadas

        if n == 0:
            return {'ok': False, 'message': 'Cero edificios borrados', 'data': [[0]]}
        elif n == 1:
            return {'ok': True, 'message': f'Plot Deleted. Filas afectadas: {n}', 'data': [[n]]}
        else:
            return {'ok': False, 'message': f'Demasiados edificios borrados. Filas afectadas: {n}', 'data': [[n]]}

    def select(self, gid:int)->dict:
        q="select gid, descripcion, area, st_astext(geom) from d.plots where gid = %s"
        self.conn.cursor.execute(q,[gid])
        l = self.conn.cursor.fetchall()
        n=len(l)
        return {'ok':True,'message':f'Plot Selected: {n}','data':l}
        
    def selectAsDict(self, gid:int)->dict:
        q="""
        SELECT array_to_json(array_agg(registros)) FROM (
            select gid, descripcion, area, st_astext(geom), st_asgeojson(geom) 
            from d.plots where gid = %s
         ) as registros
        """
        self.conn.cursor.execute(q,[gid])
        l = self.conn.cursor.fetchall()
        r=l[0][0]
        if r is None:
            return {'ok':True,'message':f'Plot Selected: 0','data':[]}
        else:
            n=len(r)
            return {'ok':True,'message':f'Edificios seleccionados: {n}','data':r}

    def selectAsDictByArea(self, area:int)->dict:
        q="""
        SELECT array_to_json(array_agg(registros)) FROM (
            select gid, descripcion, area, st_astext(geom), st_asgeojson(geom) 
            from d.plots where st_area(geom) > %s
         ) as registros
        """
        self.conn.cursor.execute(q,[area])
        l = self.conn.cursor.fetchall()
        r=l[0][0]
        if r is None:
            return {'ok':True,'message':f'Edificios seleccionados: 0','data':[]}
        else:
            n=len(r)
            return {'ok':True,'message':f'Edificios seleccionados: {n}','data':r}


    def selectAll(self)->list:
        q="select gid, descripcion, area, st_astext(geom) from d.plots limit 1000"
        self.conn.cursor.execute(q,)
        l = self.conn.cursor.fetchall()
        n=len(l)
        return {'ok':True,'message':f'Edificios seleccionados: {n}','data':l}

    def selecAllAsDict(self):
        q="""
        SELECT array_to_json(array_agg(registros)) FROM (
            select gid, descripcion, area, st_astext(geom), st_asgeojson(geom) 
            from d.plots limit 1000
         ) as registros
        """
        self.conn.cursor.execute(q)
        l = self.conn.cursor.fetchall()
        r=l[0][0]
        n=len(r)
        if r is None:
            return {'ok':True,'message':f'Edificios seleccionados: 0','data':[]}
        else:
            n=len(r)
            return {'ok':True,'message':f'Edificios seleccionados: {n}','data':r}