import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const {userId} = await params
    const { userId: callingUserId } = await auth();
    if (!callingUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const caller = await prisma.user.findUnique({ where: { clerkId: callingUserId } });
    if (!caller?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { banned } = await req.json();

  const updatedUser = await prisma.user.updateMany({
  where: { id: userId, isAdmin: false },
  data: { banned },
});

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}