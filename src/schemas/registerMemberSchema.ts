import { registerSchema } from '@/schemas/registerSchema';
import type z from 'zod';

export const registerMemberSchema = registerSchema;

export type RegisterMemberFormValues = z.infer<typeof registerMemberSchema>;
