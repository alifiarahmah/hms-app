import { parseICS } from '@libs/calendar';
import { AsyncRoute } from '@libs/server/asyncWrapper';
import BuildRoute from '@libs/server/nextConnect';
import serialize from '@libs/server/serialize';
import { NextApiRequest, NextApiResponse } from 'next';

const CalendarRoute = BuildRoute('single');
CalendarRoute.post(
  AsyncRoute(
    async (
      req: NextApiRequest & {
        file: Express.Multer.File;
      },
      res: NextApiResponse
    ) => {
      const ICSData = req.file.buffer.toString();
      // const events = parseICS(req.file.buffer.toString());
      res.json(serialize('Upload ICS success', parseICS(ICSData)));
    }
  )
);

export default CalendarRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
