import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  console.log('Middleware triggered for:', req.url);
  
  if (isProtectedRoute(req)) {
    console.log('Protected route accessed:', req.url);
    const { userId } = await auth();
    console.log('User ID:', userId);
    
    if (!userId) {
      console.log('No user ID found, redirecting to sign-in');
      return Response.redirect(new URL('/sign-in', req.url));
    }
  }
});

export const config = {
  matcher: ['/((?!.*\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};