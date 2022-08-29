import { z } from 'zod';

export const LoginReqSchema = z.object({
  nim: z.string(),
  password: z.string(),
});
export type LoginReqType = z.infer<typeof LoginReqSchema>;
