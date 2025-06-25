import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ postId: string } >}
) {
  try {
    const {postId} = await params
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const postToUpdate = await prisma.post.findUnique({
      where: { id:postId },
      select: { authorId: true } 
    });

    if (!postToUpdate) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    const user = await prisma.user.findUnique({
        where: { clerkId },
        select: { id: true }
    });


    if (user?.id !== postToUpdate.authorId) {
       return NextResponse.json({ error: 'Forbidden: You are not the author of this post' }, { status: 403 });
    }

    const body = await req.json();
    const { title, content, categoryId, published } = body;

    const updatedPost = await prisma.post.update({
      where: { id:postId },
      data: {
        title,
        content,
        categoryId,
        published,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const {postId} = await params
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const postToDelete = await prisma.post.findUnique({
      where: { id: postId },
      select: { author: { select: { clerkId: true } } }
    });

    if (!postToDelete) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (user?.clerkId !== postToDelete.author.clerkId && !user?.isAdmin) {
       return NextResponse.json({ error: 'Forbidden: You cannot delete this post' }, { status: 403 });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}