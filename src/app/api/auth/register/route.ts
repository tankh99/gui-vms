import { prisma } from "@/src/lib/prisma";
import { genSalt, hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {

    genSalt(3, async (err, salt) => {
      if (err) {
        console.error('Error generating salt:', err);
        
      } else {
        console.log('Generated salt:', salt);

        const hashedPassword = await hash(body.password, salt)
        const user = await prisma.user.create({
          data: {
            email: body.email,
            password: hashedPassword,
            passwordSalt: salt
          }
        })
        console.log(user)
        const {password, ...result} = user
        return NextResponse.json(JSON.stringify(result));
      }
    })
  } catch (ex) {
    console.error(ex);
  }
  return NextResponse.json({data: "Error. Failed somehow"})
}