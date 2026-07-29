import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const needsAuth = pathname.startsWith('/dashboard');
  const isLogin   = pathname === '/login';

  // Rotas públicas: sem chamada de rede ao Supabase
  if (!needsAuth && !isLogin) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // /dashboard/* exige autenticação
  if (!user && needsAuth) {
    const res = NextResponse.redirect(new URL('/login', request.url));
    res.headers.set('Cache-Control', 'no-store');
    return res;
  }

  // Usuário autenticado na tela de login vai direto ao dashboard
  if (user && isLogin) {
    const res = NextResponse.redirect(new URL('/dashboard', request.url));
    res.headers.set('Cache-Control', 'no-store');
    return res;
  }

  supabaseResponse.headers.set('Cache-Control', 'no-store, private');
  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|logo\\.png|.*\\.svg).*)'],
};
