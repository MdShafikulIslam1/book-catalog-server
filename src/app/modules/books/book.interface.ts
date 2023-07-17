export type IBook = {
  title: string;
  author: string;
  genre: string;
  imageUrl: string;
};

export type IFilterableFields = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
};
