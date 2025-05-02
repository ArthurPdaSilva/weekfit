import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserSchemaModel = z.infer<typeof UserSchema>;
