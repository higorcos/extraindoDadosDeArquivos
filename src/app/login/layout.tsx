// pages/admin/layout.tsx
import "./globals.css";

import React from 'react';
import { AuthProvider } from '../../context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  );
}