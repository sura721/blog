'use client';

import dynamic from 'next/dynamic';

const PostForm = dynamic(
  () => import('@/components/Form/Admin/PostForm'), 
  { 
    ssr: false,
    loading: () => <p>Loading form...</p>
  }
);

export default function PostFormLoader() {
  return <PostForm />;
}