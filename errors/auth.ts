import { GeneralError } from './general';

export class InvalidUsernameOrPasswordError extends GeneralError {
  constructor() {
    super('Invalid username or password', 401);
  }
}

export class InvalidTokenError extends GeneralError {
  constructor() {
    super('Invalid token', 401);
  }
}

export class Unauthorized extends GeneralError {
  constructor() {
    super('Unauthorized', 401);
  }
}
