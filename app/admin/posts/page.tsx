import Link from 'next/link';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { Toaster } from 'react-hot-toast';
import { PostActions } from '@/components/admin/PostActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  const { userId: clerkId } = await auth();

  const posts = await prisma.post.findMany({
    include: {
      author: true,
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
      <Toaster position="bottom-center" />
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>All Posts</CardTitle>
            <CardDescription>Manage all blog posts here.</CardDescription>
          </div>
          <Link href="/admin/posts/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Post
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.author.username}</TableCell>
                    <TableCell>{post.category.name}</TableCell>
                    <TableCell>
                      <Badge variant={post.published ? 'default' : 'secondary'}>
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <PostActions post={post} canPerformAction={clerkId === post.author.clerkId} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid gap-4 md:hidden">
            {posts.map((post) => (
              <div key={post.id} className="rounded-lg border bg-card text-card-foreground p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-semibold">{post.title}</span>
                  <Badge variant={post.published ? 'default' : 'secondary'} className="shrink-0">
                    {post.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>
                    <span className="font-medium text-foreground">Author: </span>
                    {post.author.username}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Category: </span>
                    {post.category.name}
                  </div>
                </div>
                <div className="flex items-center justify-end pt-2">
                  <PostActions post={post} canPerformAction={clerkId === post.author.clerkId} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}