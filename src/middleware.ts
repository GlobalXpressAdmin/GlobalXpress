import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    
    // Si es una ruta de admin y el usuario no es admin, redirigir
    if (isAdminRoute && token?.rol !== "ADMIN" && token?.rol !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/ingreso-cliente", req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/area-personal/:path*",
  ],
}; 