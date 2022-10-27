import { BadRequestError, FileIsRequiredError, InternalServerError } from '@errors/server';
import { AsyncRoute } from '@libs/server/asyncWrapper';
import ErrorHandler from '@libs/server/errorHandler';
import { BuildFileMiddleware, BuildRoute } from '@libs/server/nextConnect';
import serialize from '@libs/server/serialize';
import { uploadFile, deleteFile } from '@services/drive';
import prisma from '@services/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const Mading = BuildRoute();

Mading.get(
  ErrorHandler(async (req, res) => {
    const mading = await prisma.mading.findMany({});
    res.status(200).json(serialize('Get Madings successful', mading));
  })
);

Mading.post(
  BuildFileMiddleware('single'),
  AsyncRoute(
    async (
      req: NextApiRequest & {
        file: Express.Multer.File;
      },
      res: NextApiResponse
    ) => {
      const { file } = req;
      if (!file) throw new FileIsRequiredError();
      const { title, tag } = req.body;

      // check if tag exist
      const tagExist = await prisma.tag.findFirst({
        where: {
          name: tag,
        },
      });

      if (!tagExist) throw new BadRequestError('Tag not found');

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

      const mading = await prisma.mading.create({
        data: {
          imageId: photo.id,
          title,
          tagName: tag,
        },
      });

      res.json(serialize('Upload photo success', mading));
    }
  )
);

Mading.put(
  BuildFileMiddleware('single'),
  AsyncRoute(
    async (
      req: NextApiRequest & {
        file: Express.Multer.File;
      },
      res: NextApiResponse
    ) => {
      const { file } = req;
      const { title, tag, id } = req.body;

      // check if id exist
      const madingExist = await prisma.mading.findFirst({
        where: {
          id,
        },
      });
      if (!madingExist) throw new BadRequestError('Mading not found');

      // check if tag exist
      const tagExist = await prisma.tag.findFirst({
        where: {
          name: tag,
        },
      });

      if (!tagExist) throw new BadRequestError('Tag not found');

      if (file) {
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

        const mading = await prisma.mading.update({
          where: {
            id,
          },
          data: {
            imageId: photo.id,
            title,
            tagName: tag,
          },
        });

        res.json(serialize('Upload photo success', mading));
      } else {
        const mading = await prisma.mading.update({
          where: {
            id,
          },
          data: {
            title,
            tagName: tag,
          },
        });

        res.json(serialize('Upload photo success', mading));
      }
    }
  )
);

Mading.delete(
  AsyncRoute(async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body);
    const { id } = req.body;

    // check if id exist
    const madingExist = await prisma.mading.findFirst({
      where: {
        id,
      },
    });

    if (!madingExist) throw new BadRequestError('Mading not found');

    const [mading, image] = await prisma.$transaction([
      prisma.mading.delete({
        where: {
          id,
        },
      }),
      prisma.image.delete({
        where: {
          id: madingExist.imageId,
        },
      }),
    ]);

    if (!mading || !image) throw new InternalServerError('Delete mading error');

    // delete image from drive
    deleteFile(image.id);

    res.json(serialize('Delete mading success', mading));
  })
);

export default Mading;

export const config = {
  api: {
    bodyParser: false,
  },
};
