// middleware.ts

import { NextResponse, type NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  // Middleware logic here
  return NextResponse.next();
}
