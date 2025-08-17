import "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      access_token: string;
      refresh_token: string;
      reset_password_token: string;
      toke: string;
      name: string;
      expiresIn: number;
      phone: string;
    };
  }

  interface User {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    email: string;
    name: string;
    phone: string;
    reset_password_token: string;
    toke: string;
  }

  interface JWT {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: User;
  }
}
