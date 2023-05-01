
from src.database import Database
import time
import requests

DB = Database("localhost", "root", "root", "ia")
if not DB:
    print("Falha na conexao.")
    exit()

class insertData:
    def __init__(self, phrase):
        self.listItems = []
        self.PHRASE = phrase;
    def getPhrase(self, type):
        if type == "array":
            return self.PHRASE.lower().split(" ")
        elif type == "text":
            return self.PHRASE.lower()
        else:
            return False
    def existsData(self):
        try:
            if (len(DB.cursor("SELECT id FROM dataword WHERE id = 1", False, False))) > 0:
                return True
            else:
                return False
        except:
            return False
    def initialize(self):
        limit = len(self.getPhrase("array"))
        for i,palavra in enumerate(self.getPhrase("array")):
            if i != limit - 1:
                self.listItems.append({"Word": palavra, "Nextword": self.getPhrase("array")[i + 1]})
            
        for i, item in enumerate(self.listItems):
            pesquisa = DB.cursor("SELECT id, relational FROM dataword WHERE word = %s", False, (item["Word"],))
            if len(pesquisa) > 0:
                # get all nextWord and verify or insert 
                nextPesquisa = DB.cursor("SELECT id FROM dataword WHERE word = %s", False, (item["Nextword"],))
                if len(nextPesquisa) > 0:
                    preventRelationals = str(pesquisa[0][1]).replace("None", "")
                    if not item["Nextword"] in preventRelationals:
                        preventRelationals += ", " + item["Nextword"]
                    DB.cursor("UPDATE dataword SET relational = %s WHERE word = %s", False, (preventRelationals, item["Word"],))
                    pass;
                else:
                    DB.cursor("INSERT INTO dataword(word, relational) VALUES (%s, %s)", False, (item["Nextword"],None))
                    preventRelationals = str(pesquisa[0][1]).replace("None", "")
                    if not item["Nextword"] in preventRelationals:
                        preventRelationals += ", " + item["Nextword"]
                    DB.cursor("UPDATE dataword SET relational = %s WHERE word = %s", False,(preventRelationals, item["Word"]))
                    pass
            else:
                DB.cursor("INSERT INTO dataword(word, relational) VALUES(%s, %s)", False, (item["Word"], None,))
                nextPesquisa = DB.cursor("SELECT id FROM dataword WHERE word = %s", False, (item["Nextword"],))
                if len(nextPesquisa) > 0:
                    preventRelationals = str(pesquisa[0][1]).replace("None", "")
                    if not item["Nextword"] in preventRelationals:
                        preventRelationals += ", " + item["Nextword"]
                    DB.cursor("UPDATE dataword SET relational = %s WHERE word = %s", False, (preventRelationals, item["Word"],))
                    pass;
                else:
                    DB.cursor("INSERT INTO dataword(word, relational) VALUES (%s, %s)", False, (item["Nextword"],None))
                    preventRelationals = item["Nextword"]
                    DB.cursor("UPDATE dataword SET relational = %s WHERE word = %s", False,(preventRelationals, item["Word"]))
                    pass
    def generateData(self):
        itemsToSort = []
        for item in self.getPhrase("array"):
            dataReceiv = DB.cursor("SELECT * FROM dataword WHERE word = %s", False, (item, ))
            lastItems = []
            while True:
                for 


def insertion():
    for i in range(1):
        REQ = requests.get("https://pensador-api.vercel.app/?term=temos+tudo&max=50")
        for item in REQ.json()["frases"]:
            data = insertData(item["texto"])
            data.initialize()
            print(item["texto"])

#insertion()

def generateForMe():
    data = insertData("A vida ama bela.")
    print(data.generateData())

generateForMe()


