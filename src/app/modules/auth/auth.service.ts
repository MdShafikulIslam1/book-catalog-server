import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import { JwtHelpers } from '../../../helpers/jwtHelpes';
import config from '../../../config';

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User is not Exist');
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Email or Password is Incorrect'
    );
  }
  const jwtPayload = { id: isUserExist?._id, email: isUserExist?.email };
  const accessToken = JwtHelpers.createToken(
    jwtPayload,
    config.secret_key as string,
    config.expires_in_secret_key as string
  );
  const refreshToken = JwtHelpers.createToken(
    jwtPayload,
    config.refresh_secret_key as string,
    config.expires_in_refresh_key as string
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};
