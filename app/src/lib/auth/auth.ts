import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = (
          user as {
            access_token: string;
            refresh_token: string;
            expires_in: number;
          }
        ).access_token;
        token.refreshToken = (
          user as {
            access_token: string;
            refresh_token: string;
            expires_in: number;
          }
        ).refresh_token;
        token.expiresIn = (
          user as {
            access_token: string;
            refresh_token: string;
            expires_in: number;
          }
        ).expires_in;
      }
      const isExpired =
        token.expiresIn &&
        typeof token.expiresIn === "number" &&
        Date.now() > token.expiresIn * 1000;
      if (isExpired) {
        return null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) return { ...session, ...token };
      return session;
    },
  },
});
