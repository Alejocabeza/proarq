import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable(),
  dni: z.string().min(1),
  address: z.string().uuid().optional().nullable(),
});

export const clientUpdateSchema = clientSchema.partial();
