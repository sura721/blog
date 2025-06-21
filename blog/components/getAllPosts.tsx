import Image from 'next/image';
import Link from 'next/link';
import type { Post, User, Category } from '@prisma/client';
import { ImageIcon } from 'lucide-react';

type PostWithDetails = Post & {
  author: User;
  category: Category;
};

const PostCard = ({ post }: { post: PostWithDetails }) => {
  const createExcerpt = (htmlContent: string, length: number = 100) => {
    if (!htmlContent) {
      return '';
    }

    const decodedHtml = htmlContent
      .replace(/</g, '<')
      .replace(/>/g, '>');

    const plainText = decodedHtml.replace(/<[^>]+>/g, '');
    
    if (plainText.length <= length) {
      return plainText;
    }
    return plainText.slice(0, length).trim() + '...';
  };
  
  const authorName = post.author?.username || 'Unknown Author';
  const authorImage = post.author?.imageUrl;
  const categoryName = post.category?.name || 'Uncategorized';

  return (
    <Link href={`/posts/${post.slug}`} className="group block" aria-label={`Read more about ${post.title}`}>
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1.5">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted/50">
              <ImageIcon className="h-16 w-16 text-muted-foreground/50" strokeWidth={1} />
            </div>
          )}
          <div className="absolute top-0 right-0 m-3">
            <span className="rounded-full bg-primary/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-primary-foreground">
              {categoryName}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h2 className="mb-3 text-xl font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="flex-1 text-base text-muted-foreground">
            {createExcerpt(post.content)}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm">
            {authorImage && (
              <Image
                src={authorImage}
                alt={authorName}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">
                {authorName}
              </span>
              <time
                dateTime={new Date(post.createdAt).toISOString()}
                className="text-muted-foreground"
              >
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function PostsGrid({ posts }: { posts: PostWithDetails[] }) {
  console.log('--- DEBUG: DATA RECEIVED BY POSTSGRID COMPONENT ---');
  console.log(`Total posts received: ${posts?.length || 0}`);
  console.log(posts);
  console.log('----------------------------------------------------');

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24">
        <h2 className="text-3xl font-bold text-foreground">No Posts Found</h2>
        <p className="mt-3 max-w-md text-lg text-muted-foreground">
          It looks like there are no posts to display. Why not create the first one?
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}