import { UnitEnum } from "@app/enum/unit.enum";
import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1),
  unit: z.nativeEnum(UnitEnum),
  quantity: z.preprocess((value) => {
    if (typeof value === "string" || typeof value === "number") {
      const parsed = Number(value);
      return isNaN(parsed) ? undefined : parsed;
    }
    return undefined;
  }, z.number().min(1)),
  serviceCategory: z.string().uuid().optional().nullable(),
  items: z
    .array(
      z.object({
        activity: z.string().uuid(),
        unitedPrice: z.preprocess((value) => {
          if (typeof value === "string" || typeof value === "number") {
            const parsed = Number(value);
            return isNaN(parsed) ? undefined : parsed;
          }
          return undefined;
        }, z.number()),
        percentage: z.preprocess((value) => {
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

export const serviceUpdateSchema = serviceSchema.partial();
