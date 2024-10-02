// pages/admin/layout.tsx
'use client'
import { redirect } from 'next/navigation'
import React, { useContext,ReactNode } from 'react';
import { AuthProvider, AuthContext } from '@/context/AuthContext';
import { PortalProvider } from '@/context/PortalContext';


export default function AdminLayout({ children }: { children: ReactNode }) {
  const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const context = useContext(AuthContext);

    if (!context) {
      throw new Error('AuthContext must be used within an AuthProvider');
    }
  
    const { authenticated, loading } = context;

    if (loading) {
      return
    }
    if (!authenticated) {
      redirect('/login')
    }
    
    return children

  }
  return (
  <AuthProvider>
    <PrivateRoute>
      <PortalProvider>
        {children}
      </PortalProvider>
    </PrivateRoute>
  </AuthProvider>
  );
}