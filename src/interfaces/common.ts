/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenericErrorMessages } from './error';
export type IGenericResponse<T> = {
  meta: {
    groupData?: any;
    page?: number;
    limit?: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessages[];
};
