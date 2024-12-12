
import { clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['!/api/fileuploader/route.ts','!/api/webhooks/clerk(.*)','/sign-in(.*)','/sign-up(.*)',])

export default clerkMiddleware(  (auth, req) => {
  console.log('Middleware invoked for:', req.nextUrl.pathname);
  if (isProtectedRoute(req))  auth.protect()}
)

export const config = {
  matcher: [
    '/((?!_next|.*\\..*|favicon\\.ico).*)',
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}


