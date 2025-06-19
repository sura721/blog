
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <nav className="w-64 bg-gray-800 text-white p-4 h-screen">
        <h2 className="text-xl font-bold mb-8">Admin Menu</h2>
        <ul>
          <li className="mb-4">
            <Link href="/admin/categories/create" className="hover:text-blue-300">Create Category</Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/posts/create" className="hover:text-blue-300">Create Post</Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
}