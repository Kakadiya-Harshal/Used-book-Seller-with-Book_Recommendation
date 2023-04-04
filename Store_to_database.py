import pymongo
import numpy as np
import pandas as pd
from Recommendation_Model import *


myclient = pymongo.MongoClient(
    "MogoDb Database link")
mydb = myclient["test"]
mycol = mydb["recbooks"]

# books = pd.read_csv('C://BookBee//server//books2lower.csv', low_memory=False)

pt = pd.read_csv('C://BookBee//server//pt.csv', low_memory=False)


# print(books[['Book_Title']].iloc[0])
# print(books.iloc[0])
print("\n")


# print(pt['Book-Title'].iloc[0])

# rbook = recommend(str(pt['Book_Title'].iloc[0]))

# rbook = recommend('a bend in the road')
# print(rbook)
# obj = {"searched_book": rbook}

# mycol.insert_one(obj)


for i in range(718):
    rbook = recommend(pt['Book_Title'].iloc[i])
    obj = {"searched_book": rbook, "bookname": pt['Book_Title'].iloc[i]}
    # obj = {"searched_book": rbook}
    mycol.insert_one(obj)


# mylist = [
#   { "name": "Amy", "address": "Apple st 652"},
#   { "name": "Hannah", "address": "Mountain 21"},
#   { "name": "Michael", "address": "Valley 345"},
#   { "name": "Sandy", "address": "Ocean blvd 2"},
#   { "name": "Betty", "address": "Green Grass 1"},
#   { "name": "Richard", "address": "Sky st 331"},
#   { "name": "Susan", "address": "One way 98"},
#   { "name": "Vicky", "address": "Yellow Garden 2"},
#   { "name": "Ben", "address": "Park Lane 38"},
#   { "name": "William", "address": "Central st 954"},
#   { "name": "Chuck", "address": "Main Road 989"},
#   { "name": "Viola", "address": "Sideway 1633"}
# ]

# x = mycol.insert_many(mylist)

# #print list of the _id values of the inserted documents:

# print(x.inserted_ids)
