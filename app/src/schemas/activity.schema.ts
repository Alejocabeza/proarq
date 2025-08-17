import { z } from "zod";

export const activitySchema = z.object({
  name: z.string().min(1),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        percentage: z.preprocess((value) => {
          if (typeof value === "string" || typeof value === "number") {
            const parsed = Number(value);
            return isNaN(parsed) ? undefined : parsed;
          }
          return undefined;
        }, z.number().min(1)),
        provider: z.string().uuid().optional().nullable(),
        providerItem: z.string().uuid().optional().nullable(),
        price: z.string().uuid(),
      }),
    )
    .optional(),
});

export const activityUpdateSchema = activitySchema.partial();
