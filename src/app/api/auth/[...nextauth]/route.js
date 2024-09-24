import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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
        const res = await axios.post(`${process.env.NEXTAUTH_URL}/login`, {
          credentials,
        });
        const { user } = res.data;
        if (res.status === 200 && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to your custom login page
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.name = `${user.first_name} ${user.last_name}`;
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      (session.accessToken = token.accessToken),
        (session.user.name = token.name);

      return session;
    },
  },
});

export { handler as GET, handler as POST };