import { z } from 'zod';

export const UploadPhotoSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type UploadPhotoReqType = z.infer<typeof UploadPhotoSchema>;

export const SendTokenForgotPasswordSchema = z.object({
  email: z.string().email(),
  nim: z.string(),
});

export type SendTokenForgotPasswordReqType = z.infer<typeof SendTokenForgotPasswordSchema>;

export const ConsumeTokenForgotPasswordSchema = z.object({
  token: z.string(),
  password: z.string(),
});

export type ConsumeTokenForgotPasswordReqType = z.infer<typeof ConsumeTokenForgotPasswordSchema>;
