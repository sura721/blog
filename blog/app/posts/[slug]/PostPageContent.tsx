import prisma from '@/lib/prisma';
import PostRenderer from '@/components/PostRenderer';
import { notFound } from 'next/navigation';

// This is an async Server Component
export default async function PostPageContent({ slug }: { slug: string }) {
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  const decodedContent = post.content
    .replace(/</g, '<')
    .replace(/>/g, '>');

  const postWithDecodedContent = { ...post, content: decodedContent };

  return <PostRenderer post={postWithDecodedContent} />;
}