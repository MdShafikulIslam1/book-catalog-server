import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './book.interface';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';
import { filterableFields } from './book.constant';

const createBook = catchAsync(async (req, res) => {
  const { ...bookData } = req.body;
  const result = await BookService.createBook(bookData);
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully create Book catalog',
    data: result,
  });
});
const getAllBook = catchAsync(async (req, res) => {
  const filters = pick(req.query, filterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await BookService.getAllBook(filters, paginationOptions);
  sendResponse<IBook[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully retrieve all Book catalog',
    data: result?.data,
    meta: result?.meta,
  });
});
const getSingleBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookService.getSingleBook(id);
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully retrieve a Single  Book catalog',
    data: result,
  });
});
const updateBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;
  const result = await BookService.updateBook(id, updatedData);
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully update a Book catalog',
    data: result,
  });
});
const deleteBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookService.deleteBook(id);
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully delete Book catalog',
    data: result,
  });
});
export const BookController = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
};
