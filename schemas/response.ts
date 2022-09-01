/*
Contoh penggunaan

const res : ResType<LoginResType> = await axios...

*/
export type ResType<T> = {
  isError: boolean;
  message: string;
  data: T;
};
export type LoginResType = {
  token: string;
};
export type TokenResType = {
  nim: string;
  name: string;
  email: string;
};
