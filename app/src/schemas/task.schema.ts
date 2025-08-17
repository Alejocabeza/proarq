import { StatusEnum } from "@app/enum/status.enum";
import { z } from "zod";

export const taskSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  status: z.nativeEnum(StatusEnum),
  project: z.string().uuid(),
});

export const taskUpdateSchema = taskSchema.partial();
