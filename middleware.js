// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/registrarTorneo", "/admin/registrados"],
// };
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  if (!token) return NextResponse.redirect(new URL("/auth/login", request.url));

  // Check the role and redirect based on the role
  switch (token.role) {
    case "admin":
      if (!request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin/registrados", request.url));
    }
    break;
    // if (
    //   !request.nextUrl.pathname.startsWith("/admin/actividad") &&
    //   !request.nextUrl.pathname.startsWith("/admin/programacion") &&
    //   !request.nextUrl.pathname.startsWith("/admin/registrados")
    // ) {
    //   return NextResponse.redirect(new URL("/admin/registrados", request.url));
    // }
    // break;
    case "participante":
      // Add the paths that the nurse can access here
      if (!request.nextUrl.pathname.startsWith("/registrarTorneo")) {
        return NextResponse.redirect(new URL("/registrarTorneo", request.url));
      }
      break;

    default:
      return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    "/((?!api|_next/static|_next/image|favicon.ico|auth/login).*)",
  ],
};
