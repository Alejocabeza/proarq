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
        token.accessToken = user.access_token;
        token.refreshToken = user.refresh_token;
        token.expiresIn = user.expires_in;
      }
      const isExpired = (token.expiresIn as number) && Date.now() > (token.expiresIn as number) * 1000;
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
