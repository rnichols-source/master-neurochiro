import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const cookieStore = await request.cookies;
  const isFounderGhost = cookieStore.get('__nc_founder_ghost')?.value === 'active_founder_session_v1';

  // 1. Redirect authenticated users away from public login page to portal
  if (user && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/portal', request.url))
  }

  // 2. Protect Portal routes (Members only)
  if (!user && request.nextUrl.pathname.startsWith('/portal')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 3. Protect Admin routes (Admin only)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // If stealth ghost cookie is present, allow access instantly
    if (isFounderGhost) return response;

    if (!user) return NextResponse.redirect(new URL('/login', request.url))
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', user.id)
      .single()

    if (profile?.tier !== 'admin') {
      return NextResponse.redirect(new URL('/portal', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/portal/:path*', '/admin/:path*', '/login'],
}
