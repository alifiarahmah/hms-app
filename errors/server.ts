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

export class FileIsRequiredError extends GeneralError {
  constructor() {
    super('File is required', 400);
  }
}

export class BadRequestError extends GeneralError {
  constructor(message?: string) {
    if (message) {
      super('Bad request: ' + message, 400);
    } else {
      super('Bad request', 400);
    }
  }
}
