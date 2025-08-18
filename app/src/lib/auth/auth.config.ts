import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      authorize: async ({ email, password }) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/sign-in`,
            {
              method: "POST",
              body: JSON.stringify({
                email,
                password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          const user = await res.json();

          if (user.statusCode && user.statusCode !== 200) {
            throw new Error(user.message);
          }

          return user;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unexpected error occurred";
          throw new Error(errorMessage);
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
