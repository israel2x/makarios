import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import db from '../../../libs/db';
import bcrypt from 'bcrypt';

const authOptions = {
    providers:[
        CredentialProvider({
            name:'Credentials',
            credentials:{
                email:{ label: "Email", type:"text", placeholder:"alec"},
                password:{ label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
              const userFound = await db.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })
                if (!userFound) throw new Error('No user found');

                // console.log("userFound");
                // console.log(userFound);
                // console.log(credentials);
        
                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);
        
                if (!matchPassword) throw new Error('Wrong password');
                const user = {
                    id: userFound.id,
                    name: userFound.firstname,
                    role: userFound.role,
                    email: userFound.email,
                  } 
              
                return user;
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
      },
      callbacks: {
        async session({ session, token, user }) {
          // Send properties to the client, like an access_token and user id from a provider.
          session.accessToken = token.accessToken
          session.user.id = token.id
          
          return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
  }

export default NextAuth(authOptions);
//   const handler =  NextAuth(authOptions);

//   export default {handler as GET, handler as POST};