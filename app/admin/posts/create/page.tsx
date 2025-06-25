import prisma from '@/lib/prisma';
import { Toaster } from 'react-hot-toast';
import PostForm from '@/components/Form/AdminComponent/PostForm';

export const dynamic = 'force-dynamic';

export default async function CreatePostPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="container mx-auto py-8">
      <Toaster position="bottom-center" />
      <h1 className="text-3xl font-bold mb-6 text-foreground">Create a New Post</h1>
      <PostForm />
    </div>
  );
}