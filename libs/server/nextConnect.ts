import nextConnect from 'next-connect';
import multer from 'multer';
import ErrorHandler from './errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

// Next js sucks, so we port next js api using next connect then use multer
const upload = multer({
  storage: multer.memoryStorage(),
});

type RouteFileType = 'single' | 'array';

const BuildRoute = (routeFileType: RouteFileType = 'single') => {
  const route = nextConnect({
    onError(error, req, res) {
      const nextReq = req as NextApiRequest;
      const nextRes = res as NextApiResponse;
      ErrorHandler(() => {
        console.log(error);
        throw error;
      })(nextReq, nextRes);
    },
  });
  switch (routeFileType) {
    case 'single':
      route.use(upload.single('file'));
      break;
    case 'array':
      route.use(upload.array('files'));
      break;
  }
  return route;
};

export default BuildRoute;
