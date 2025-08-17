import { TypeClientEnum } from "@app/enum/type-client.enum";
import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  typeClient: z.nativeEnum(TypeClientEnum),
  branch: z.string().uuid().nullable(),
  client: z.string().uuid().nullable(),
  address: z.string().uuid().nullable(),
});

export const projectUpdateSchema = projectSchema.partial();
