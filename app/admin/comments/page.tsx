import prisma from '@/lib/prisma';
import { Toaster } from 'react-hot-toast';
import { CommentActions } from '@/components/admin/CommentActions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const dynamic = 'force-dynamic';

export default async function AdminCommentsPage() {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
      post: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
      <Toaster position="bottom-center" />
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
          <CardDescription>
            Moderate all comments across your blog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>In Response To</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user.imageUrl ?? ''} />
                          <AvatarFallback>{comment.user.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium whitespace-nowrap">{comment.user.username}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-sm">
                      &apos;{comment.content.substring(0, 50)}{comment.content.length > 50 ? '...' : ''}&apos;
                    </TableCell>
                    <TableCell>
                      <a href={`/posts/${comment.post.slug}`} target="_blank" className="hover:underline font-medium text-primary whitespace-nowrap">
                        {comment.post.title}
                      </a>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                       <CommentActions comment={comment} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid gap-4 md:hidden">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-lg border bg-card text-card-foreground p-4 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={comment.user.imageUrl ?? ''} />
                      <AvatarFallback>{comment.user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{comment.user.username}</span>
                  </div>
                  <CommentActions comment={comment} />
                </div>
                
                <p  className="text-sm text-muted-foreground pl-12">
                  &apos;{comment.content.substring(0, 100)}{comment.content.length > 100 ? '...' : ''}&apos;
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                  <a href={`/posts/${comment.post.slug}`} target="_blank" className="hover:underline font-medium text-primary truncate pr-2">
                    Re: {comment.post.title}
                  </a>
                  <span className="flex-shrink-0">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No comments yet. Keep posting!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}