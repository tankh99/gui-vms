'use client'

import { signIn } from 'next-auth/react'
import React from 'react'
import {useSearchParams, useRouter} from 'next/navigation'
import Link from 'next/link';

export default function RegisterForm() {

  const router = useRouter();
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/auth/login"

  const onSubmit = async (e: React.FormEvent) => {

  }

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      router.push("/api/auth/signin")
      const res = await signIn("credentials", {
        // redirect: true,
        email: "dummy@gmail.com",
        password: "password",
        callbackUrl
      })
      // const res = await fetch("/api/auth/new-user", {
      //   body: JSON.stringify({
      //     email: "admin@gmail.com",
      //     password: "password",
      //   }),
      //   method: "POST"
      // })
      // console.log(res)
      // if (!res?.error) {

      //   // router.push(callbackUrl)
      // } else {
      //   alert("Invalid username or password")
      // }
    } catch (ex) {
      console.log("Error", ex)
    }

  }
  return (
    <form>
      <button onClick={login}>Register</button>
    </form>
  )
}
