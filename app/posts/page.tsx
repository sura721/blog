import PostsGrid from '@/components/getAllPosts';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export default async function AllPostsPage() {
  const posts = await prisma.post.findMany({
      where: {
      published: true,
    },
    include: {
      author: true,
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          All Blog Posts
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore articles on web development, design, and more.
        </p>
      </header>
      <main>
        <PostsGrid posts={posts} />
      </main>
    </div>
  );
}