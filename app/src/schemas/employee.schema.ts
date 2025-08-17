import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable(),
  dni: z.string().min(1),
});

export const employeeUpdateSchema = employeeSchema.partial();
