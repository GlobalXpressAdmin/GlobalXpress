export const runtime = 'nodejs';

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { sendBienvenidaEmail } from '../../../../lib/sendBienvenidaEmail';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Correo electrónico", type: "email", placeholder: "nombre@tucorreo.com" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;
          const user = await prisma.usuarios_global.findUnique({
            where: { email: credentials.email },
          });
          if (!user) return null;
          if (!user.password) return null;
          const passwordOk = await bcrypt.compare(credentials.password, user.password);
          if (!passwordOk) return null;
          return {
            id: user.id,
            email: user.email,
            nombre: user.nombre || undefined,
          };
        } catch (error) {
          console.error("Error en authorize:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/ingreso-cliente",
  },
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      // Lógica para Google
      if (account?.provider === 'google') {
        // Buscar usuario en la base de datos
        let dbUser = await prisma.usuarios_global.findUnique({ where: { email: token.email } });
        if (!dbUser) {
          // Crear usuario nuevo
          dbUser = await prisma.usuarios_global.create({
            data: {
              email: token.email,
              nombre: profile?.name || '',
              password: '',
              telefono: '',
              genero: '',
              fecha_nacimiento: undefined,
              nacionalidad: '',
            },
          });
          await sendBienvenidaEmail(token.email || '', profile?.name || '');
        } else if (!dbUser.nombre && profile?.name) {
          // Si ya existe pero no tiene nombre, actualizarlo
          dbUser = await prisma.usuarios_global.update({
            where: { email: token.email },
            data: { nombre: profile.name }
          });
        }
        token.id = dbUser.id;
        token.nombre = dbUser.nombre;
      }
      // Lógica para credenciales
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.nombre = user.nombre;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        if (!session.user) session.user = {};
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.nombre = token.nombre;
      }
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      // Redirigir siempre a /area-personal tras login exitoso
      return `${baseUrl}/area-personal`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 