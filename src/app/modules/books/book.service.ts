import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IBook, IFilterableFields } from './book.interface';
import { Book } from './book.model';
import { IGenericResponse } from '../../../interfaces/common';
import { searchAbleFields } from './book.constant';

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const result = await Book.create(payload);
  return result;
};
const getAllBook = async (
  filterOptions: IFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[] | null>> => {
  const { searchTerm, ...filtersData } = filterOptions;
  // console.log(filtersData);
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: searchAbleFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await Book.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments(whereCondition);
  return {
    data: result,
    meta: {
      page,
      total,
      limit,
    },
  };
};
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};
const updateBook = async (
  id: string,
  updatedData: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findByIdAndUpdate(
    id,
    { $push: { reviews: updatedData.reviews } },
    { new: true }
  );
  return result;
};
// const editBook = async (
//   id: string,
//   updatedData: Partial<IBook>
// ): Promise<IBook | null> => {
//   console.log(id, updatedData);

//   const result = await Book.findByIdAndUpdate(id, updatedData, { new: true });
//   return result;
// };
const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};
export const BookService = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
  // editBook,
};
