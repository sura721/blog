"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '../../lib/generated/prisma';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { MoreHorizontal, ShieldCheck, ShieldOff, Ban, Trash2, KeyRound, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast'; 

interface UserActionsProps {
  user: User;
}

export function UserActions({ user }: UserActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAction = async (action: 'admin' | 'ban' | 'delete') => {
    setIsLoading(true);
    let url = `/api/users/${user.id}`;
    let method = 'PATCH';
    let body = {};

    switch(action) {
      case 'admin':
        url += '/admin';
        body = { isAdmin: !user.isAdmin };
        break;
      case 'ban':
        url += '/ban';
        body = { banned: !user.banned };
        break;
      case 'delete':
        method = 'DELETE';
        break;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: method !== 'DELETE' ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to perform action');
      }
      
      toast.success(`User ${action} action successful!`);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleAction('admin')}>
            {user.isAdmin ? <ShieldOff className="mr-2 h-4 w-4" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
            <span>{user.isAdmin ? 'Remove Admin' : 'Make Admin'}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction('ban')}>
             {user.banned ? <KeyRound className="mr-2 h-4 w-4" /> : <Ban className="mr-2 h-4 w-4" />}
            <span>{user.banned ? 'Un-ban User' : 'Ban User'}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete User</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user <span className="font-bold">{user.username}</span> and all of their associated data from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => handleAction('delete')} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Yes, delete user
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}