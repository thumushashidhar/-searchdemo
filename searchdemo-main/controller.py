from fastapi.middleware.cors import CORSMiddleware
import MySQLdb
import mysql.connector
from fastapi import FastAPI
app = FastAPI()
origins = ["http://localhost:3000", "localhost:3000"
           ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get('/get')
async def getAll(value):
    mydb = MySQLdb.connect(host="127.0.0.1", user="root",
                           passwd="Tarun@2002", port=9306, database='test')
    my = mydb.cursor()
    value = "\"" + str(value) + "\""
    my.execute(
        "SELECT * FROM test1stemmed1 WHERE  MATCH('"+value+"')limit 5; SHOW META;")
    print(my._last_executed)
    rows = my.fetchall()
    a = []
    for row in rows:
        for i in range(len(row)):
            a.append(row[i])
    a.sort()
    b = str(tuple(a))
    myy = mysql.connector.connect(
        host="localhost", user="root", passwd="Tarun@2002", db="test")
    sql = myy.cursor()
    ab = "SELECT NCTNumber FROM ClincalDatatUS_new WHERE ID IN"+str(b)
    sql.execute(ab)
    sqleows = sql.fetchall()
    d1 = dict(enumerate(sqleows))
    return sqleows

