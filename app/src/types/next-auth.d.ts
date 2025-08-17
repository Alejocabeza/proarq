import "next-auth";

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
}
