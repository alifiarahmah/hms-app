import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import prisma from '@services/prisma';

const Tag = ErrorHandler(async (req, res) => {
  if (req.method === 'GET') {
    const tags = await prisma.tag.findMany({});
    res.status(200).json(serialize('Get tags successful', tags));
  }
});

export default Tag;
