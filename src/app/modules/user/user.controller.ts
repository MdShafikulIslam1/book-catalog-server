import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    message: 'Successfully create User',
    success: true,
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await UserService.getSingleUser(email);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    message: 'Successfully Get Single User',
    success: true,
    data: result,
  });
});
export const UserController = {
  createUser,
  getSingleUser,
};
