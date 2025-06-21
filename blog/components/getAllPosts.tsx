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
    const text = htmlContent.replace(/<[^>]+>/g, '');
    if (text.length <= length) {
      return text;
    }
    return text.slice(0, length) + '...';
  };

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative w-full aspect-video overflow-hidden">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {post.category.name}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h2 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-foreground">
            {post.title}
          </h2>
          <p className="flex-1 text-muted-foreground">
            {createExcerpt(post.content)}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm">
            {post.author.imageUrl && (
              <Image
                src={post.author.imageUrl}
                alt={post.author.username || ''}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">
                {post.author.username}
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
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h2 className="text-2xl font-semibold text-foreground">No Posts Found</h2>
        <p className="mt-2 text-muted-foreground">
          It looks like there are no posts to display at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}