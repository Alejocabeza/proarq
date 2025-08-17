import z from "zod";

const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "The password must be at least 8 characters long" })
    .max(50, { message: "The password must not exceed 50 characters" })
    .regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        "The password must have an uppercase letter, a lowercase letter, and a number or special character",
    }),
});

export const loginSchema = authSchema.omit({ name: true });
export const registerSchema = authSchema;
export const forgotPasswordSchema = authSchema.omit({
  password: true,
  name: true,
});
export const resetPasswordSchema = authSchema.omit({
  name: true,
  password: true,
});
