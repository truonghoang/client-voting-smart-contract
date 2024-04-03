import   { NextResponse } from "next/server";

  import type {NextRequest} from "next/server";

const protectedRoutes = ["/"];
let isAuthenticated= false

export default function middleware(req: NextRequest) {
  let cookie = req.cookies.get('ethereum_add');
  let res = NextResponse.next()
  isAuthenticated = cookie ?true :false
  console.log("middleware check")
 if(req.nextUrl.pathname.includes('login') ) {
  const cookies = req.headers.get("cookie");
  if (cookies) {
    const cookieValue = cookies
      .split(";")
      .find((c) => c.trim().startsWith(`ethereum_add=`));
    if (cookieValue) {
        res.headers.set("Set-Cookie", `${cookieValue}; Max-Age=0`);
     return res
      
    }
  }
   
 }
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
   
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
// match tới các route mà middleware sẽ check 
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}