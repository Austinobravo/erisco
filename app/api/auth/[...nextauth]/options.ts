import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
export const options:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'email',
                    placeholder: 'Your Email',
                    type: 'email'
                },
                password: {
                    label: 'password',
                    placeholder: 'Your Password',
                    type: 'password'
                },
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials.password) throw new Error('Invalid credentials')

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })

                if (!user) throw new Error("User not found")

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)
                if(!isCorrectPassword) throw new Error("Incorrect password")

                const {password, ...UserWithoutPassword} = user
                return UserWithoutPassword
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
    },
    callbacks: {
        session: async ({session, token}) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    email: token.email,
                    username: token.username
                }
            }
        },
        async jwt ({token, user}) {
            if(user){
                return {
                    ...token,
                    id: user.id,
                    username: (user as any).username,
                    email: user.email,
                }
            }
            return token
            
        },
    }
}