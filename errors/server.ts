import { GeneralError } from '@errors/general';

export class MethodNotAllowedError extends GeneralError {
  constructor() {
    super('Method not allowed', 405);
  }
}
