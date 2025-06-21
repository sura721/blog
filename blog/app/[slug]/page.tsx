import PostRenderer from '@/components/PostRenderer';
import prisma from '@/lib/prisma';

import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
 
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

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

  const decodedContent = post.content
    .replace(/</g, '<')
    .replace(/>/g, '>');

  const postWithDecodedContent = { ...post, content: decodedContent };

  return (
    <div className="container mx-auto px-4 py-8">
      <PostRenderer post={postWithDecodedContent} />
    </div>
  );
}