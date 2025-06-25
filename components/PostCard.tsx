import Image from 'next/image';
import Link from 'next/link';
import type { User, Post, Category } from '@/lib/generated/prisma';
import { ImageIcon, ArrowRight, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type PostWithDetails = Post & {
  author: User;
  category: Category;
};

const PostCard = ({ post }: { post: PostWithDetails }) => {
  const createExcerpt = (htmlContent: string, length: number = 100) => {
    if (!htmlContent) return '';
    const plainText = htmlContent.replace(/<[^>]+>/g, '');
    if (plainText.length <= length) return plainText;
    return plainText.slice(0, length).trim() + '...';
  };

  const authorName = post.author?.username || 'Unknown Author';
  const authorImage = post.author?.imageUrl;
  const categoryName = post.category?.name || 'Uncategorized';

  return (
    <Card className="h-full flex flex-col bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 group">
      <Link href={`/posts/${post.slug}`} className="focus:outline-none" aria-label={`Read more about ${post.title}`}>
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-lg">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted/40">
              <ImageIcon className="h-16 w-16 text-muted-foreground/30" strokeWidth={1} />
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
          <Badge variant="secondary">{categoryName}</Badge>
          <div className="flex items-center gap-3">
            <time dateTime={new Date(post.createdAt).toISOString()}>
              {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </time>
            <span className="text-muted-foreground/50">·</span>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.views?.toLocaleString() ?? 0}</span>
            </div>
          </div>
        </div>

        <h2 className="mb-3 text-xl font-semibold leading-tight text-foreground">
          <Link href={`/posts/${post.slug}`} className="hover:text-primary transition-colors duration-200">
            {post.title}
          </Link>
        </h2>

        <p className="flex-grow text-sm text-muted-foreground leading-relaxed">
          {createExcerpt(post.content)}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {authorImage && (
              <Image
                src={authorImage}
                alt={authorName}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="font-medium text-sm text-foreground">{authorName}</span>
          </div>
          <Link href={`/posts/${post.slug}`} className="text-sm font-semibold text-primary flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Read More
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;