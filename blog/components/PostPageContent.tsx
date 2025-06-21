import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PostRenderer from './PostRenderer';

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