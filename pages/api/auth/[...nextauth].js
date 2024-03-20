import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import db from "../../../libs/db";
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "alec" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const userFound = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (!userFound) throw new Error("No user found");

          const matchPassword = await bcrypt.compare(
            credentials.password,
            userFound.password
          );

          if (!matchPassword) throw new Error("Wrong password");

          return { ...userFound, password: null, name: userFound.firstname, role: userFound.role };
        } catch (error) {
          console.log(error);
        }
        // const user = {
        //     id: userFound.id,
        //     name: userFound.firstname,
        //     role: userFound.role,
        //     email: userFound.email,
        //   }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    // signOut: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      session.user.name = token.name;
      // console.log("token :>> ", token);
      // console.log("session :>> ", session);
      
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
//   const handler =  NextAuth(authOptions);

//   export default {handler as GET, handler as POST};
