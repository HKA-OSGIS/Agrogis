import psycopg2
from django.db import connection as conn

class Conn():
    conn = None
    cursor = None

    def __init__(self):
        self.conn = conn
        self.conn.autocommit = True  # Habilitar autocommit en la conexión
        self.cursor = self.conn.cursor()

    def close(self):
        self.conn.close()
