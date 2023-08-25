import Link from "next/link";
import RegisterForm from "./form";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import authOptions from "../../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth/next";
import { getProviders } from "next-auth/react";

export default function Register() {
  // async function getServerSessionContext() {
  //   'use server'
  //   const session = await getServerSession(context.req, context.res, authOptions)
  //   console.log("session", session);
  //   if (!session) {
  //     return {redirect: {destination: "/"}}
  //   }
  //   const providers = await getProviders();
  //   console.log(providers);
  //   return {
  //     props: {
  //       providers : providers ?? []
  //     }
  //   }
  // }
  // console.log(providers)
  return (
    <div>
      <RegisterForm/>
    </div>
  )
}
