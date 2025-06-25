'use client';
import Image from 'next/image';
import type { User, Post, Comment, Category } from '@/lib/generated/prisma';
import { Toaster } from 'react-hot-toast';
import { CommentSection } from '@/components/posts/CommentSection';
import { motion } from '@/lib/motion';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

type PostWithDetails = Post & {
  author: User;
  category: Category;
  comments: (Comment & { user: User })[];
};

export default function PostRenderer({ post }: { post: PostWithDetails }) {
  if (!post) {
    return null;
  }

  const authorName = post.author?.username || 'Anonymous';
  const authorImage = post.author?.imageUrl;
  const categoryName = post.category?.name || 'Uncategorized';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Toaster position="bottom-center" />
    
      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <article className="max-w-3xl mx-auto flex flex-col gap-8 py-12 px-4 sm:px-0 md:py-20">
          <motion.header
            variants={itemVariants}
            className="flex flex-col gap-4 border-b border-border/50 pb-8"
          >
            <Badge variant="secondary" className="w-fit">{categoryName}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight bg-gradient-to-br from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground mt-4">
              {authorImage && (
                <Image
                  src={authorImage}
                  alt={authorName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-foreground">{authorName}</span>
                <div className="flex items-center gap-3">
                  <time dateTime={new Date(post.createdAt).toISOString()}>
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="text-muted-foreground/50">·</span>
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    <span>{post.views ?? 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.header>

          {post.image && (
            <motion.figure
              variants={itemVariants}
              className="relative w-full aspect-video rounded-xl overflow-hidden my-4 shadow-lg"
            >
              <Image
                src={post.image}
                alt={`Featured image for ${post.title}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 896px"
              />
            </motion.figure>
          )}

          <motion.div
            variants={itemVariants}
            className="prose prose-lg dark:prose-invert max-w-none
                       prose-headings:font-serif prose-headings:tracking-tight
                       prose-a:text-primary hover:prose-a:text-primary/80 transition-colors
                       prose-blockquote:border-primary prose-blockquote:text-muted-foreground
                       prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:bg-muted prose-code:text-foreground prose-code:px-1.5 prose-code:py-1 prose-code:rounded-md"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <motion.div variants={itemVariants} className="max-w-3xl mx-auto px-4">
          <CommentSection postId={post.id} initialComments={post.comments} />
        </motion.div>
      </motion.div>
    </>
  );
}