import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // const currentUser = request.cookies.get('currentUser')?.value
 
  // if (currentUser && !request.nextUrl.pathname.startsWith('/admin')) {
  //   return Response.redirect(new URL('/admin/default', request.url))
  // }
 
  // if (!currentUser && !request.nextUrl.pathname.startsWith('/auth')) {
  //   return Response.redirect(new URL('/auth/sign-in', request.url))
  // }
}
 
export const config = {
   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  
}