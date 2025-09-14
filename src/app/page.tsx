'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  // Always call hooks unconditionally
  const clerkUser = useUser();
  
  // Check if Clerk is available
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const isClerkAvailable = publishableKey && publishableKey !== 'pk_test_your_publishable_key_here';
  
  // Use Clerk data only if available, otherwise provide defaults
  const isSignedIn = isClerkAvailable ? (clerkUser.isSignedIn ?? false) : false;
  const isLoaded = isClerkAvailable ? (clerkUser.isLoaded ?? true) : true;
  
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (isClerkAvailable && isSignedIn) {
        router.push('/dashboard');
      } else {
        router.push('/sign-in');
      }
    }
  }, [isSignedIn, isLoaded, router, isClerkAvailable]);

  // Show loading spinner while checking authentication
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );
}
