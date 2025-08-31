'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser, logoutUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser, clearAuth, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          if (pathname.startsWith('/profile') || pathname.startsWith('/notes')) {
            clearAuth();
            await logoutUser();
            router.push('/sign-in');
          }
        }
      } catch {
        if (pathname.startsWith('/profile') || pathname.startsWith('/notes')) {
          clearAuth();
          await logoutUser();
          router.push('/sign-in');
        }
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      checkSession();
    } else {
      setLoading(false);
    }
  }, [pathname, router, user, setUser, clearAuth]);

  if (loading) {
    return <p>Loading...</p>;
  }

  
  return (
    <>
      {isAuthenticated ? children : children}
    </>
  );
}
