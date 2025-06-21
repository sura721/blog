import Image from 'next/image';
import type { Post, User } from '@prisma/client';

type PostWithAuthor = Post & {
  author: User;
};

export default function PostRenderer({ post }: { post: PostWithAuthor }) {
  if (!post) {
    return null; 
  }

  
  const authorName = post.author?.username || 'Anonymous';
  const authorImage = post.author?.imageUrl;

  return (
    <article className="max-w-3xl mx-auto flex flex-col gap-8 py-8 px-4 sm:px-0">
      <header className="flex flex-col gap-4 border-b border-border pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          {authorImage && (
            <Image
              src={authorImage}
              alt={authorName}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-foreground">{authorName}</span>
            <time dateTime={new Date(post.createdAt).toISOString()}>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </header>

      {post.image && (
        <figure className="relative w-full aspect-video rounded-xl overflow-hidden my-4 shadow-lg">
          <Image
            src={post.image}
            alt={`Featured image for ${post.title}`}
            fill
            priority 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 896px"
          />
        </figure>
      )}

    
      <div
        className="prose dark:prose-invert max-w-none text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
  
  
}
