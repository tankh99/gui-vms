'use client';

import { SessionProvider } from "next-auth/react";

export default function MySessionProvider({children}: {children: any}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}