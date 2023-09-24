import { Schema, model } from 'mongoose';
import { IBook } from './book.interface';

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publication_date: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    reviews: {
      type: Array<string>,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Book = model<IBook>('Book', bookSchema);
