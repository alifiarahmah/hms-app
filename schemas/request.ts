import { z } from 'zod';

export const UploadPhotoSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type UploadPhotoReqType = z.infer<typeof UploadPhotoSchema>;
