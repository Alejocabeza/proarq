import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().min(1),
  country: z.string().min(1),
  state: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  mainAddress: z.string().min(1).nullable(),
});

export const addressUpdateSchema = addressSchema.partial();
