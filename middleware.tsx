import { NextResponse } from "next/server";
import { auth } from "./app/_lib/auth";

// export default function middleware(request) {
//   return NextResponse.redirect(new URL("/about", request.url));
// }
export const middleware = auth;

export const config = {
  matcher: ["/account"], //the code in our middleware only works for these routes.
};
