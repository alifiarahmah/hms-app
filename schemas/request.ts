import { z } from 'zod';

export const UploadPhotoSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
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

export type CreateSingleUserReqType = z.infer<typeof CreateSingleUserSchema>;

export const CreateSingleEventSchema = z.object({
  uid: z.string().optional(),
  start: z.preprocess((value) => new Date(value as string), z.date()),
  end: z.preprocess((value) => new Date(value as string), z.date()),
  title: z.string(),
  description: z.string().optional(),
  rrule: z.string().optional().nullable(),
  meetingLink: z.string().optional().nullable(),
});

export type CreateSingleEventReqType = z.infer<typeof CreateSingleEventSchema>;

export const EditProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});

export type EditProfileReqType = z.infer<typeof EditProfileSchema>;

export const CreateSinglePostSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

export type CreateProfileReqType = z.infer<typeof CreateSinglePostSchema>;
