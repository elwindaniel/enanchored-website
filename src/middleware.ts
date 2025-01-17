// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY as string);

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/admin')) {
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);

      if (payload?.role !== 'admin') {
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    } catch (err) {
      console.error('JWT verification failed:', err);
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Additional route protections can be added here

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
