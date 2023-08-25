'use client'

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

export default function Navbar() {
  const {data: session} = useSession();
  console.log("session", session)
  return (
    <div className="w-screen flex justify-between">
      <p>Navbar</p>
      {/* <Link href="/auth/login">Login</Link> */}
      {!session 
      ? <button onClick={() => signIn()}>Sign In</button>
      : (
        <div className='flex gap-4'>
          <p>Hello {session.user?.email}</p> |
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      )
      }
    </div>
  )
}
