import { z } from "zod";

export default interface UserType {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  tableId?: number;
}

export const UserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserSchemaModel = z.infer<typeof UserSchema>;
