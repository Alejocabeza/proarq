import { z } from "zod";

export const providerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  dni: z.string().min(6),
  phone: z.string().nullable(),
  address: z.string().uuid().optional().nullable(),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        amount: z.preprocess((value) => {
          if (typeof value === "string" || typeof value === "number") {
            const parsed = Number(value);
            return isNaN(parsed) ? undefined : parsed;
          }
          return undefined;
        }, z.number()),
      }),
    )
    .optional()
    .nullable(),
});

export const providerUpdateSchema = providerSchema.partial();
