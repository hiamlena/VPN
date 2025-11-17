import { AppError } from './errors';

interface HandledError {
  message: string;
  userMessage: string;
}

export const handleError = (error: unknown): HandledError => {
  if (error instanceof AppError) {
    return { message: error.message, userMessage: error.userMessage };
  }

  if (error instanceof Error) {
    return { message: error.message, userMessage: 'Неизвестная ошибка. Попробуйте снова.' };
  }

  return { message: 'Неизвестная ошибка', userMessage: 'Неизвестная ошибка. Попробуйте снова.' };
};
