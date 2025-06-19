import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { username, email, clerkId, imageUrl } = await req.json()

    if (!username || !email || !clerkId) {
      return NextResponse.json(
        {
          error: 'Missing required fields: username, email, and clerkId are required.',
          received: { username, email, clerkId },
        },
        { status: 400 }
      )
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        clerkId,
        imageUrl: imageUrl || null,
      },
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (err: any) {
    console.error('POST /api/users failed:', err)
    const debugInfo = {
      message: err.message,
      code: err.code,
      meta: err.meta,
    }

    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0]
      return NextResponse.json(
        {
          error: `A user with this ${field} already exists.`,
          debugInfo,
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to create user due to an internal server error.',
        debugInfo,
      },
      { status: 500 }
    )
  }
}