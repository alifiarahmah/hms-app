import { GeneralError } from '@errors/general';

export class MethodNotAllowedError extends GeneralError {
  constructor() {
    super('Method not allowed', 405);
  }
}

export class InternalServerError extends GeneralError {
  constructor(message?: string) {
    if (message) {
      super('Internal server error: ' + message, 500);
    } else {
      super('Internal server error', 500);
    }
  }
}
