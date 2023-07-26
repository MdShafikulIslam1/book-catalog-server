/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  _id: string;
  email: string;
  password: string;
};

export type IUserMethods = {
  isUserExist(email: string): Promise<IUser>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
