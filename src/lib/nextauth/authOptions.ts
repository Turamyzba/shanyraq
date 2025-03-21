// src/lib/nextauth/authOptions.ts
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login, getCurrentUser } from '../api/authService';

// Define custom types for NextAuth to use with credentials
declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
    refreshToken: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image?: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Call the login function from our authService
          const response = await login({
            email: credentials.email,
            password: credentials.password,
          }) as any;

          if (response.token) {
            // Return the user object with token
            return {
              id: response.user.id,
              name: `${response.user.name} ${response.user.lastname}`,
              email: response.user.email,
              role: response.user.role,
              token: response.token,
              refreshToken: response.refreshToken
            };
          }
          
          return null;
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        // Need to cast user to our custom User type
        const typedUser = user as {
          id: string;
          role: string;
          token: string;
          refreshToken: string;
        };
        
        token.id = typedUser.id;
        token.role = typedUser.role;
        token.accessToken = typedUser.token;
        token.refreshToken = typedUser.refreshToken;
      }
      
      // On subsequent calls, check if the token is still valid
      // This is a good place to implement token refresh logic
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};