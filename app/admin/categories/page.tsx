import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Toaster } from 'react-hot-toast';
import { CategoryActions } from '@/components/admin/CategoryActions'; 
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
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <>
      <Toaster position="bottom-center" />
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              Manage your blog post categories here.
            </CardDescription>
          </div>
          <Link href="/admin/category/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Category
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category Name</TableHead>
                  <TableHead className="text-center">Post Count</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{category._count.posts}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <CategoryActions category={category} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="grid gap-4 md:hidden">
            {categories.map((category) => (
              <div key={category.id} className="rounded-lg border bg-card text-card-foreground p-4 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-lg">{category.name}</span>
                  <CategoryActions category={category} />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-3">
                  <span>Post Count</span>
                  <Badge variant="secondary">{category._count.posts}</Badge>
                </div>
              </div>
            ))}
          </div>
          
          {categories.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No categories found.</p>
              <p className="text-sm mt-2">Why not create one?</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}