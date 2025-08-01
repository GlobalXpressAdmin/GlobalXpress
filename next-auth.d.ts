import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      email?: string;
      nombre?: string;
      rol?: string;
    };
  }
  interface User {
    id: string;
    email: string;
    nombre?: string;
    rol?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    nombre?: string;
    rol?: string;
  }
} 