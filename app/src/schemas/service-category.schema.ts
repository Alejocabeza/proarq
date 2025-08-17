import { z } from "zod";

export const serviceCategorySchema = z.object({
  name: z.string().min(1),
});

export const serviceCategoryUpdateSchema = serviceCategorySchema.partial();
