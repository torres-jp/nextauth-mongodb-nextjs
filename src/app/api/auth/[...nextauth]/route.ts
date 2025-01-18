import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/libs/mongodb'
import User from '@/models/user'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email@mail.com' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '******',
        },
      },
      async authorize(credentials, req) {
        await connectDB()
        console.log(req)

        const userFound = await User.findOne({
          email: credentials?.email,
        })

        if (!userFound) throw new Error('User not found')

        const passMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        )
        if (!passMatch) throw new Error('Invalid credentials')

        return userFound
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.user as any

      return session
    },
  },
  pages: {
    signIn: '/login',
  },
})

export { handler as GET, handler as POST }
