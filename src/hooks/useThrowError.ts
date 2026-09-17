import { AppError } from '@/utils/AppError';
import { useEffect, useState } from 'react';

export const useThrowError = () => {
  const [error, throwError] = useState<unknown | null>(null);

  useEffect(() => {
    if (!error) return;
    if (error instanceof Error) {
      throw error;
    }

    console.warn('non-error values', error);
    throw new AppError(undefined, { cause: error });
  }, [error]);

  return { throwError };
};
