import { ResType } from '@schemas/response';

const serialize = (message: string, data: any): ResType<any> => {
  return {
    message,
    data,
    isError: false,
  };
};

export default serialize;
