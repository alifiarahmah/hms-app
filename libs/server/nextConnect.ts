import nextConnect from 'next-connect';
import multer from 'multer';
import ErrorHandler from './errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

// Next js sucks, so we port next js api using next connect then use multer
const upload = multer({
  storage: multer.memoryStorage(),
});

const BuildRoute = () => {
  const route = nextConnect({
    onError(error, req, res) {
      const nextReq = req as NextApiRequest;
      const nextRes = res as NextApiResponse;
      ErrorHandler(() => {
        throw error;
      })(nextReq, nextRes);
    },
  });
  route.use(upload.array('file'));
  return route;
};

export default BuildRoute;
