import {NextRequest, NextResponse} from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({message: "FUCK YOU"});
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log(body)
  return NextResponse.json({message: body});
}