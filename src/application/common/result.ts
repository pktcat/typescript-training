import { Result } from './types';

export const Ok = <T>(value: T): Result<T, never> => {
  return {
    success: true,
    value,
  };
};

export const Err = <E>(error: E): Result<never, E> => {
  return {
    success: false,
    error,
  };
};
