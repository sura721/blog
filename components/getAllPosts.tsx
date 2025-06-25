import Image from 'next/image';
import Link from 'next/link';

import type { User, Post,Category } from '@/lib/generated/prisma';

import { ImageIcon } from 'lucide-react';
import PostCard from './PostCard';

type PostWithDetails = Post & {
  author: User;
  category: Category;
};

export default function PostsGrid({ posts }: { posts: PostWithDetails[] }) {

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