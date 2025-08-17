import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  dni: z.string().nullable(),
  phone: z.string().nullable(),
});
