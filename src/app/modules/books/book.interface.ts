export type IBook = {
  title: string;
  author: string;
  genre: string;
  imageUrl: string;
  publication_date: string;
  reviews?: Array<string>;
};

export type IFilterableFields = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
};
