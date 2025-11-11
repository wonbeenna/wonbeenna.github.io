'use client';

import React from 'react';
import { ThemeProvider as Provider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider attribute="class" storageKey={`${process.env.NEXT_PUBLIC_BASE_URL}-theme`}>
      {children}
    </Provider>
  );
}
