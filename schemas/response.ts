import { z } from 'zod';

export const ResSchema = z.object({
  message: z.string(),
  isError: z.boolean(),
  data: z.any(),
});
export type ResType = z.infer<typeof ResSchema>;

export const LoginResSchema = ResSchema.extend({
  data: z
    .object({
      token: z.string(),
      user: z.object({
        id: z.string(),
        nim: z.string(),
        name: z.string(),
        email: z.string(),
      }),
    })
    .or(z.null()),
});
export type LoginResType = z.infer<typeof LoginResSchema>;
