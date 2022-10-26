import { BadRequestError } from '@errors/server';
import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import { Tag } from '@prisma/client';
import prisma from '@services/prisma';

const Mading = ErrorHandler(async (req, res) => {
  if (req.method === 'GET') {
    // get image where dont have image post
    const mading = await prisma.image.findMany({
      include: {
        ImagePost: true,
        tags: true,
      },
    });
    res.status(200).json(
      serialize(
        'Get Madings successful',
        mading.filter((m) => m.ImagePost.length === 0)
      )
    );
  } else if (req.method === 'POST') {
    const { title, tags, image } = req.body;

    if (tags) {
      // Check if tags already available
      const tagsData = await prisma.tag.findMany({});

      // throw an error if tags unavailable
      for (const tag of tags) {
        if (!tagsData.find((t) => t.name === tag)) {
          throw new BadRequestError(`Tag ${tag} is not available`);
        }
      }
    }

    const mading = await prisma.image.create({
      data: {
        title,
        id: image,
      },
    });

    // connect tags to mading
    if (tags) {
      await prisma.image.update({
        where: {
          id: mading.id,
        },
        data: {
          tags: {
            connect: tags.map((tag: Tag) => ({ name: tag })),
          },
        },
      });
    }

    res.status(200).json(serialize('Create specific post successful', mading));
  }
});

export default Mading;
