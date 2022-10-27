import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import prisma from '@services/prisma';

const Mading = ErrorHandler(async (req, res) => {
  if (req.method === 'GET') {
    // get image where dont have image post
    const mading = await prisma.mading.findMany({});
    res.status(200).json(serialize('Get Madings successful', mading));
  }
});

export default Mading;
