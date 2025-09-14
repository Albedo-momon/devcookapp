'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Check if we're in a browser environment to prevent SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Enhanced Clerk configuration check
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const isClerkConfigured = 
    publishableKey && 
    publishableKey !== 'pk_test_your_publishable_key_here' && 
    publishableKey.startsWith('pk_') &&
    publishableKey.length > 20;

  // Always call hooks unconditionally to maintain hook order
  const clerkResult = useUser();
  
  // Only use the result if mounted and Clerk is configured
  const isSignedIn = (mounted && isClerkConfigured) ? (clerkResult.isSignedIn ?? false) : false;
  const isLoaded = (mounted && isClerkConfigured) ? (clerkResult.isLoaded ?? true) : true;

  useEffect(() => {
    if (!mounted) return; // Don't redirect during SSR
    
    if (isLoaded) {
      if (isClerkConfigured && isSignedIn) {
        router.push('/dashboard');
      } else {
        router.push('/sign-in');
      }
    } else if (!isClerkConfigured) {
      router.push('/sign-in');
    }
  }, [isSignedIn, isLoaded, router, isClerkConfigured, mounted]);

  // Show loading during SSR and initial client render
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );
}
