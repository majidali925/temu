import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          user
        );
        if (res.status === 200 && user) {
          user.access_token = res?.data?.access_token;
          user.name = `${res?.data?.user?.firstName} ${res?.data?.user?.lastName}`;
          return user;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to your custom login page
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      // console.log({ token, account, user }, "front");

      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.name = user.name
          ? user.name
          : account.provider === "google"
          ? user.name
          : `${user.email}`;
        token.accessToken = user.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.user.name = token.name;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
