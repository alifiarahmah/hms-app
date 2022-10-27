import { BadRequestError, InternalServerError, MethodNotAllowedError } from '@errors/server';
import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import { deleteFile } from '@services/drive';
import prisma from '@services/prisma';

const DeleteMading = ErrorHandler(async (req, res) => {
  if (req.method === 'DELETE') {
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
  } else {
    throw new MethodNotAllowedError();
  }
});

export default DeleteMading;
