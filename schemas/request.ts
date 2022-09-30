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

export const PatchSingleUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
});

export type PatchSingleUserReqType = z.infer<typeof PatchSingleUserSchema>;

export const CreateSingleUserSchema = z.object({
  nim: z.string().length(8).regex(/\d+/, 'Must be a number'),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});
