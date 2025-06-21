import prisma from '@/lib/prisma';
import PostRenderer from '@/components/PostRenderer';
import { notFound } from 'next/navigation';

export default async function SinglePostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  const decodedContent = post.content.replace(/</g, '<').replace(/>/g, '>');
  const postWithDecodedContent = { ...post, content: decodedContent };

  return (
    <div className="container mx-auto">
      <PostRenderer post={postWithDecodedContent} />
    </div>
  );
}