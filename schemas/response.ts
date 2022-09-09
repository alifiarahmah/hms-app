/*
Contoh penggunaan

const res : ResType<LoginResType> = await axios...

*/
export type ResType<T> = {
  isError: boolean;
  message: string;
  data: T;
};

// Public
export type LoginResType = {
  token: string;
};

// User
export type TokenResType = {
  nim: string;
  name: string;
  email: string;
};

