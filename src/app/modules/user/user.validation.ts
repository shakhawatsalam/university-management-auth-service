import { z } from 'zod';

// Zod validations
const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
});

// Zod validations
// await createUserZodSchema.parseAsync(req);

export const UserValidation = {
  createUserZodSchema,
};
