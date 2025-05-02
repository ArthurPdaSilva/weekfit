import { z } from "zod";

export type UserSession = {
  id: string;
  name: string;
  email: string;
};

export const UserSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").optional(),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(6, "A senha deve ter entre 6 e 20 caracteres")
    .max(20, "A senha deve ter entre 6 e 20 caracteres"),
});

export type UserSchemaModel = z.infer<typeof UserSchema>;
