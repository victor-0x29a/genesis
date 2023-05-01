import mysql.connector
class Database:
    def __init__(self, host, user, password, database):
        try:
            self.DB = mysql.connector.connect(host=host, user=user, password=password, database=database)
            self.Cursor = self.DB.cursor()
        except:
            self.DB = False
    def cursor(self, query, values, attach):
        if not self.DB:
            return False
        if values:
            self.QUERY = self.Cursor.execute(query, values)
            self.DB.commit()
            return  True
        if query and not values and not attach:
            self.QUERY = self.Cursor.execute(query)
            return self.Cursor.fetchall()
        if query and not values and attach:
            self.QUERY = self.Cursor.execute(query, attach)
            if "UPDATE" in query or "SET" in query or "INSERT" in query:
                self.DB.commit()
                return False
            else:
                return self.Cursor.fetchall()
        else:
            return False
