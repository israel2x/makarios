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
                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);
                
                if(!userFound) throw new Error("No user found");

                return {
                    id: userFound.id,
                    firstname: userFound.firstname,
                    lastname: userFound.lastname,
                    email: userFound.email
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
      }
  }

export default NextAuth(authOptions);
//   const handler =  NextAuth(authOptions);

//   export default {handler as GET, handler as POST};