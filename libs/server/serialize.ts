import { ResType } from '@schemas/response';

const serialize = (message: string, data: any): ResType => {
  return {
    message,
    data,
    isError: false,
  };
};

export default serialize;
