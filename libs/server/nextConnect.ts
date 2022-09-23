import nextConnect, { NextConnect } from 'next-connect';
import multer from 'multer';
import ErrorHandler from './errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'http';

// Next js sucks, so we port next js api using next connect then use multer
const upload = multer({
  storage: multer.memoryStorage(),
});

type RouteFileType = 'single' | 'array';

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
  return route;
};

const BuildFileMiddleware = (routeFileType: RouteFileType) => {
  switch (routeFileType) {
    case 'single':
      return upload.single('file');
    case 'array':
      return upload.array('files');
  }
};

export { BuildRoute, BuildFileMiddleware };
