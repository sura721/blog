import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PostRenderer from './PostRenderer';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [post] = await prisma.$transaction([
    prisma.post.findUnique({
      where: {
        slug: slug,
      },
      include: {
        author: true,
        category: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    }),
    prisma.post.update({
      where: { slug: slug },
      data: {
        views: {
          increment: 1,
        },
      },
    }),
  ]);

  if (!post) {
    notFound();
  }

  const decodedContent = post.content.replace(/</g, '<').replace(/>/g, '>');
  const postWithDecodedContent = { ...post, content: decodedContent };

  return <PostRenderer post={postWithDecodedContent} />;
}