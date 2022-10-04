import { GeneralError } from '@errors/general';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, ZodIssue } from 'zod';

const ErrorHandler =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      if (error instanceof GeneralError) {
        res.status(error.code).json({ message: error.message });
      } else if (error instanceof ZodError) {
        res
          .status(400)
          .json({ message: error.errors.map((err: ZodIssue) => err.message).join(', ') });
      } else if (error instanceof Error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  };

export default ErrorHandler;
