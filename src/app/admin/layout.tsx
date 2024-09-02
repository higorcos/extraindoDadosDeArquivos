// pages/admin/layout.tsx
'use client'
import React, { useContext,ReactNode } from 'react';
import { AuthProvider, AuthContext } from '../../context/AuthContext';
import { redirect } from 'next/navigation'

interface AuthContextProps {
  authenticated: boolean;
  loading: boolean;
  user: string | null
  login: (email:string, password:string) => void;
  logout: () => void;
}
export default function AdminLayout({ children }: { children: ReactNode }) {
  const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const context = useContext(AuthContext);

  

    if (!context) {
      throw new Error('AuthContext must be used within an AuthProvider');
    }
  
    const { authenticated, loading } = context;
    console.log('iii')

    if (loading) {
      return
    }
    if (!authenticated) {
      // console.log('não tá logado')
      redirect('/login')

    }
    // console.log('logado')

    return children

  }
  return (
    <AuthProvider>
     <PrivateRoute>
        {children}
       </PrivateRoute>
    </AuthProvider>
  );
}