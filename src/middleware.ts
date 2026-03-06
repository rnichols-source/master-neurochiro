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
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // 1. Redirect authenticated users away from public login page to portal
  if (user && request.nextUrl.pathname === '/mastermind/login') {
    return NextResponse.redirect(new URL('/portal', request.url))
  }

  // 2. Protect Portal routes (Members only)
  if (!user && request.nextUrl.pathname.startsWith('/portal')) {
    return NextResponse.redirect(new URL('/mastermind/login', request.url))
  }

  // 3. Protect Admin routes (Admin only)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) return NextResponse.redirect(new URL('/mastermind/login', request.url))
    
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
  matcher: ['/portal/:path*', '/admin/:path*', '/mastermind/login'],
}
