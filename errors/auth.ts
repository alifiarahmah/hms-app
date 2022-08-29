import { GeneralError } from './general';

export class InvalidUsernameOrPasswordError extends GeneralError {
  constructor() {
    super('Invalid username or password', 401);
  }
}
