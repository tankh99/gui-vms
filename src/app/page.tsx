import Image from 'next/image'
import APITest from '../components/APITest';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <APITest/> */}
      <Link href="/api/auth/signin">Login Test</Link>
    </main>
  )
}
