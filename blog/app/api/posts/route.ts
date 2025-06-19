import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { title, slug, content, authorId, categoryId, image, published } = await req.json()

    const requiredFields = { title, slug, content, authorId, categoryId }
    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return NextResponse.json(
          {
            error: `Missing required field: ${field}.`,
            received: requiredFields,
          },
          { status: 400 }
        )
      }
    }

    const [authorExists, categoryExists] = await Promise.all([
      prisma.user.findUnique({ where: { id: authorId } }),
      prisma.category.findUnique({ where: { id: categoryId } }),
    ])

    if (!authorExists) {
      return NextResponse.json(
        {
          error: 'Author not found with the provided authorId.',
          authorId,
        },
        { status: 404 }
      )
    }

    if (!categoryExists) {
      return NextResponse.json(
        {
          error: 'Category not found with the provided categoryId.',
          categoryId,
        },
        { status: 404 }
      )
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        authorId,
        categoryId,
        image: image || null,
        published: published || false,
        publishedAt: published ? new Date() : null,
      },
    })

    return NextResponse.json(newPost, { status: 201 })
  } catch (err: any) {
    console.error('POST /api/posts failed:', err)
    const debugInfo = {
      message: err.message,
      code: err.code,
      meta: err.meta,
    }

    if (err.code === 'P2002') {
      return NextResponse.json(
        {
          error: 'A post with this slug already exists.',
          debugInfo,
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to create post due to an internal server error.',
        debugInfo,
      },
      { status: 500 }
    )
  }
}