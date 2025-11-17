export class AppError extends Error {
  constructor(message: string, public userMessage: string) {
    super(message);
    this.name = 'AppError';
  }
}

export const raise = (message: string): never => {
  throw new AppError(message, 'Произошла ошибка. Попробуйте позже.');
};
