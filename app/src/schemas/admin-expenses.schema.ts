import { z } from "zod";

export const adminExpensesSchema = z.object({
  name: z.string().min(1),
  value: z.preprocess((value) => {
    if (typeof value === "string" || typeof value === "number") {
      const parsed = Number(value);
      return isNaN(parsed) ? undefined : parsed;
    }
    return undefined;
  }, z.number().min(1)),
});

export const adminExpensesUpdateSchema = adminExpensesSchema.partial();
