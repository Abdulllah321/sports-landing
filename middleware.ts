import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale, isValidLocale } from './lib/i18n'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip API routes and static files
  if (pathname.startsWith('/api') || 
      pathname.startsWith('/_next') || 
      pathname.includes('.')) {
    return NextResponse.next()
  }

  // Get locale from cookie or default to defaultLocale
  const locale = request.cookies.get('locale')?.value || defaultLocale
  
  // Set locale cookie if not present
  if (!request.cookies.get('locale')) {
    const response = NextResponse.next()
    response.cookies.set('locale', defaultLocale, { 
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, favicon, manifest, css, public, etc.)
    '/((?!_next|api|favicon.ico|manifest|.*\\.css|.*\\.js|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.woff|.*\\.woff2|.*\\.ttf|.*\\.eot|public).*)',
  ],
}
