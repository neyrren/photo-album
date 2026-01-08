export class ApiErrorHandler {
  static getErrorMessage(error: any): string {
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    if (error.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  }

  static isAuthError(error: any): boolean {
    return error.response?.status === 401 || error.response?.status === 403;
  }

  static is404Error(error: any): boolean {
    return error.response?.status === 404;
  }

  static isBadRequest(error: any): boolean {
    return error.response?.status === 400;
  }

  static isServerError(error: any): boolean {
    return error.response?.status === 500;
  }

  static isRateLimited(error: any): boolean {
    return error.response?.status === 429;
  }
}