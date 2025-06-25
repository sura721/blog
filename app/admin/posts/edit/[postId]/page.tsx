import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { EditPostForm } from '@/components/admin/EditPostForm';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ postId: string } >}) {
    const {postId} = await params
  const { userId: clerkId } = await auth();
  
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true }
  });

  const categories = await prisma.category.findMany();

  if (!post || post.author.clerkId !== clerkId) {
    redirect('/admin/posts');
  }

  return (
     <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <EditPostForm post={post} categories={categories} />
    </div>
  );
}