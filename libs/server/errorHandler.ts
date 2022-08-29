import { GeneralError } from '@errors/general';
import { NextApiRequest, NextApiResponse } from 'next';

const ErrorHandler =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      if (error instanceof GeneralError) {
        res.status(error.code).json({ message: error.message });
      } else if (error instanceof Error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  };

export default ErrorHandler;
