import { HandlerResponse } from './types';

export const createOKResponse = <T>(body: T, statusCode: number = 200): HandlerResponse<T> => ({
  statusCode,
  body,
});

export const createErrorResponse = <T>(body: T, statusCode: number = 400): HandlerResponse<T> => ({
  statusCode,
  body,
});
