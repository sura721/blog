import prisma from '@/lib/prisma';
import PostRenderer from '@/components/PostRenderer';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    select: { title: true, content: true },
  });

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const excerpt = post.content.replace(/<[^>]+>/g, '').slice(0, 150);

  return {
    title: post.title,
    description: excerpt,
  };
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export default async function SinglePostPage({ params }: Props) { 
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
    <div className="container mx-auto">
      <PostRenderer post={postWithDecodedContent} />
    </div>
  );
}