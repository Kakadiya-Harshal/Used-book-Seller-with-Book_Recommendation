import mongoose from "mongoose";

const recommendSchema = mongoose.Schema(
  {
    searched_book: [
      {
        book_title: {
          type: String,
          required: true,
        },

        book_author: {
          type: String,
          required: true,
        },

        book_url: {
          type: String,
          required: true,
        },
      },

      {
        book_title: {
          type: String,
          required: true,
        },

        book_author: {
          type: String,
          required: true,
        },

        book_url: {
          type: String,
          required: true,
        },
      },

      {
        book_title: {
          type: String,
          required: true,
        },

        book_author: {
          type: String,
          required: true,
        },

        book_url: {
          type: String,
          required: true,
        },
      },

      {
        book_title: {
          type: String,
          required: true,
        },

        book_author: {
          type: String,
          required: true,
        },

        book_url: {
          type: String,
          required: true,
        },
      },
    ],

    bookname: {
      type: String,
      required: true,
    },
  },
  { collection: "recbooks" }
);

const RecBook = mongoose.model("RecBook", recommendSchema);
export default RecBook;
