"use client";

import { useState } from 'react';
import type { Comment, User } from '@/lib/generated/prisma'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

// Define the shape of a comment with its author
type CommentWithUser = Comment & { user: User };

interface CommentSectionProps {
  postId: string;
  initialComments: CommentWithUser[];
}

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentWithUser[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to post comment');
      }

      const createdComment: CommentWithUser = await res.json();
      setComments((prev) => [createdComment, ...prev]); 
      setNewComment('');
      toast.success('Comment posted!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Comments ({comments.length})</h2>
      
      {/* Comment Form for Logged-In Users */}
      <SignedIn>
        <form onSubmit={handleSubmit} className="mb-8">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="mb-2 bg-background"
            rows={4}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Post Comment
          </Button>
        </form>
      </SignedIn>
      
      {/* Prompt for Logged-Out Users */}
      <SignedOut>
        <div className="mb-8 p-4 border rounded-lg text-center bg-muted/50">
          <p className="text-muted-foreground">
            <SignInButton mode="modal">
              <span className="font-semibold text-primary hover:underline cursor-pointer">Sign in</span>
            </SignInButton>
            {' '}to post a comment.
          </p>
        </div>
      </SignedOut>

      {/* List of Comments */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.user.imageUrl ?? ''} />
                <AvatarFallback>{comment.user.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{comment.user.username}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-foreground/90">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-4">Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}