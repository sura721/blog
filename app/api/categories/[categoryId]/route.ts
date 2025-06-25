import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await params;
    const { userId: callingUserId } = await auth();
    if (!callingUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const caller = await prisma.user.findUnique({ where: { clerkId: callingUserId } });
    if (!caller?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

   
    await prisma.category.delete({
      where: { id:categoryId },
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    if (error.code === 'P2014' || error.code === 'P2003') {
         return NextResponse.json({ error: 'Cannot delete. Category has posts linked to it.' }, { status: 409 });
    }
     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}