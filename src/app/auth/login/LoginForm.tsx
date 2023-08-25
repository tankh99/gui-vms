'use client'

import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import {useSearchParams, useRouter} from 'next/navigation'
import { prisma } from '@/src/lib/prisma'
import { genSalt, hash } from 'bcryptjs'

interface P {

  callbackUrl?: string
  error?: string
}

export default function LoginForm(props: P) {

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/auth/login"

  const register = async () => {
    const password = "password"
    const salt = "salty pepper"
    const dummyUser = {
      email: "guy@gmail.com",
      password: password
    }
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(dummyUser),
      })
      console.log(res);
      
  }
  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    try {

      console.log("Awaiting")
      const res = await signIn("credentials", {
        redirect: true,
        username: "TESTING",
        email: "guy@gmail.com",
        password: "password",
        callbackUrl: "/"
      })
      console.log(res)
      if (res?.error) {
        alert("Invalid username or password")
      }
    } catch (ex) {
      console.log("Error", ex)
    }

  }
  return (
    <form>
      <button onClick={(e) => login(e)}>Login</button>
      <button type="button" onClick={() => register()}>Register</button>
    </form>
  )
}
