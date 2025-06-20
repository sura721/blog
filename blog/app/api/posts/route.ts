// /app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const body = await req.json();
    const { title, content, image, published, categoryId } = body;

    if (!title || !content || !categoryId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    let slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        image,
        published: published || false,
        authorId: user.id,
        categoryId: categoryId,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('[POSTS_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}