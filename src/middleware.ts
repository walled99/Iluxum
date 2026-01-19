import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['eg-en', 'eg-ar', 'ch-fr', 'ch-en']
const defaultLocale = 'eg-en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect if there is no locale
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
