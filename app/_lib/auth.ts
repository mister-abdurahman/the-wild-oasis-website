import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { pages } from "next/dist/build/templates/app-page";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: { auth: { user: string }; request: any }) {
      return !!auth?.user; //!! converts condition to a boolean.
    },
    async signIn({ user, account, profile }) {
      try {
        const guestExists = await getGuest(user.email);
        if (!guestExists) {
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session?.user?.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    // signOut: "/logout"
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
