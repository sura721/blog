import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { name } = await req.json()

    if (!name) {
      return NextResponse.json(
        {
          error: 'Missing required field: name is required.',
        },
        { status: 400 }
      )
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    })

    return NextResponse.json(newCategory, { status: 201 })
  } catch (err: any) {
    console.error('POST /api/categories failed:', err)
    const debugInfo = {
      message: err.message,
      code: err.code,
      meta: err.meta,
    }

    if (err.code === 'P2002') {
      return NextResponse.json(
        {
          error: 'A category with this name already exists.',
          debugInfo,
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to create category due to an internal server error.',
        debugInfo,
      },
      { status: 500 }
    )
  }
}