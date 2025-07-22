import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from '../../../../lib/prisma';
import { sendBienvenidaEmail } from '../../../../lib/sendBienvenidaEmail';
import bcrypt from "bcryptjs";
import { Session, User as AdapterUser } from "next-auth";
import { JWT } from "next-auth/jwt";

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
    async jwt({ token, user, account, profile }: { token: Record<string, unknown>; user?: { id: string; email: string; nombre?: string }; account?: { provider?: string }; profile?: { name?: string } }) {
      // Lógica para Google
      if (account?.provider === 'google') {
        // Validar que token.email es string
        if (typeof token.email !== 'string') {
          return token;
        }
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
          await sendBienvenidaEmail(token.email, profile?.name || '');
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
    async session(params: { session: Session; token: JWT; user?: AdapterUser; newSession?: any; trigger?: "update" }) {
      const { session, token } = params;
      if (token) {
        session.user = session.user || {};
        (session.user as { id?: string; email?: string; nombre?: string }).id = token.id as string;
        (session.user as { id?: string; email?: string; nombre?: string }).email = token.email as string;
        (session.user as { id?: string; email?: string; nombre?: string }).nombre = token.nombre as string;
      }
      return session;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      // Redirigir siempre a /area-personal tras login exitoso
      return `${baseUrl}/area-personal`;
    },
  },
}; 