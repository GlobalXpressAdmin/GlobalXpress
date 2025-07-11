import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      email?: string;
      nombre?: string;
    };
  }
  interface User {
    id: string;
    email: string;
    nombre?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    nombre?: string;
  }
} 