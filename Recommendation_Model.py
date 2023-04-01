from sklearn.metrics.pairwise import cosine_similarity
import pymongo
import numpy as np
import pandas as pd


books = pd.read_csv('C://BookBee//server//Books.csv')
users = pd.read_csv('C://BookBee//server//Users.csv')
ratings = pd.read_csv('C://BookBee//server//Ratings.csv')

books["Book_Title"] = books["Book_Title"].str.lower()
books.to_csv('books2lower.csv')

ratings_with_name = ratings.merge(books, on='ISBN')

x = ratings_with_name.groupby('User-ID').count()['Book-Rating'] > 200
padhe_likhe_users = x[x].index

filtered_rating = ratings_with_name[ratings_with_name['User-ID'].isin(
    padhe_likhe_users)]

y = filtered_rating.groupby('Book_Title').count()['Book-Rating'] >= 50
famous_books = y[y].index

final_ratings = filtered_rating[filtered_rating['Book_Title'].isin(
    famous_books)]

pt = final_ratings.pivot_table(
    index='Book_Title', columns='User-ID', values='Book-Rating')

pt.fillna(0, inplace=True)

similarity_scores = cosine_similarity(pt)
similarity_scores.shape


def toString(s):
    return ''.join(str(x) for x in s)


def recommend(book_name):
    # index fetch
    index = np.where(pt.index == book_name)[0][0]
    similar_items = sorted(
        list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:5]

    data = []
    for i in similar_items:

        item = {}
        temp_df = books[books['Book_Title'] == pt.index[i[0]]]

        # r =  temp_df.drop_duplicates('Book_Title')['Book_Title'].values
        # r2 = ''.join(str(x) for x in r)
        # print(str(r2))
        # print(type(r2))
        # print(toString(temp_df.drop_duplicates('Book_Title')['Book_Title'].values))
        item['book_title'] = toString(
            temp_df.drop_duplicates('Book_Title')['Book_Title'].values)
        item['book_author'] = toString(
            temp_df.drop_duplicates('Book_Title')['Book_Author'].values)
        item['book_url'] = toString(temp_df.drop_duplicates(
            'Book_Title')['Image-URL-M'].values)

        data.append(item)
        # print(type(item))

    return data


# output = recommend('1984')

# print(output)

# print(pt.index[545])
