
import { clerkMiddleware, createRouteMatcher,auth } from '@clerk/nextjs/server'
const isProtectedRoute = createRouteMatcher(['/','!/api/webhooks/clerk(.*)','/sign-in(.*)','/sign-up(.*)',])

export default clerkMiddleware(  async (auth, req) => {
  
  if (isProtectedRoute(req)) await auth.protect()
}
)

export const config = {
  matcher: [
    '/app/(root)/page.jsx',
    '/((?!_next|.*\\..*|favicon\\.ico).*)',
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}


