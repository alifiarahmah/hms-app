import { FileIsRequiredError, InternalServerError, MethodNotAllowedError } from '@errors/server';
import serialize from '@libs/server/serialize';
import prisma from '@services/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { BuildFileMiddleware, BuildRoute } from '@libs/server/nextConnect';
import { AsyncRoute } from '@libs/server/asyncWrapper';
import { UploadPhotoSchema } from '@schemas/request';
import { deleteFile, uploadFile } from '@services/drive';

const PhotoRoute = BuildRoute();
PhotoRoute.post(
  BuildFileMiddleware('single'),
  AsyncRoute(
    async (
      req: NextApiRequest & {
        file: Express.Multer.File;
      },
      res: NextApiResponse
    ) => {
      const { title } = UploadPhotoSchema.parse(req.body);
      const { file } = req;
      if (!file) throw new FileIsRequiredError();

      const fileId = await uploadFile(
        file,
        process.env.IMAGE_FOLDER_ID,
        title + '_' + Date.now().toString()
      );

      if (!fileId) throw new InternalServerError('Upload file error');
      const photo = await prisma.image.create({
        data: {
          id: fileId,
          title,
        },
      });

      res.json(serialize('Upload photo success', photo));
    }
  )
);

// delete route
PhotoRoute.delete(
  BuildFileMiddleware('single'),
  AsyncRoute(
    async (
      req: NextApiRequest & {
        file: Express.Multer.File;
      },
      res: NextApiResponse
    ) => {
      const { id } = req.body;
      const photo = await prisma.image.delete({
        where: {
          id,
        },
      });

      await deleteFile(id);

      res.json(serialize('Delete photo success', photo));
    }
  )
);

export default PhotoRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
