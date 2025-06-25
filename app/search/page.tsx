import PostsGrid from "@/components/getAllPosts";
import prisma from "@/lib/prisma";


export default async function SearchPage({ searchParams}:{ searchParams: Promise< { q?: string } >}) {
  const { q } = await searchParams;
  const query = q;

  if (!q) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center py-24">
          <h2 className="text-3xl font-bold text-foreground">Search for Posts</h2>
          <p className="mt-3 max-w-md text-lg text-muted-foreground">
            Please type a query in the search bar above to find posts.
          </p>
        </div>
      </div>
    );
  }

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          content: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          author: {
            username: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
      ],
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
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-8">
        Search Results for: <span className="text-primary">&quot;{query}&quot;</span>
      </h1>
      <PostsGrid posts={posts} />
    </div>
  );
}