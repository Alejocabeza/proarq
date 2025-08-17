interface AuthInterface {
  name: string;
  email: string;
  password: string;
}

export type LoginInterface = Omit<AuthInterface, "name">;
export type RegisterInterface = AuthInterface;
export type forgotPasswordInterface = Omit<AuthInterface, "name" | "password">;
export type resetPasswordInterface = Omit<AuthInterface, "email" | "name">;
