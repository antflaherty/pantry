import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith("/login");

      if (isLoggedIn) {
        if (isOnLogin) {
          return Response.redirect(new URL("/pantry", nextUrl));
        }
        return true;
      }

      if (isOnLogin) {
        return true;
      }

      return false;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
} satisfies NextAuthConfig;
