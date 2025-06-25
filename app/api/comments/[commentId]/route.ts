import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ commentId: string }> }
) {
  try {
    const {commentId} = await params
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const caller = await prisma.user.findUnique({ where: { clerkId } });
    if (!caller?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden: You are not an admin.' }, { status: 403 });
    }

    const commentToDelete = await prisma.comment.findUnique({
      where: { id:commentId },
      include: { user: true }, 
    });

    if (!commentToDelete) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    if (commentToDelete.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden: You cannot delete a comment from another admin.' }, { status: 403 });
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    return NextResponse.json({ message: 'Comment deleted successfully' });
  } catch (error) {
     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}