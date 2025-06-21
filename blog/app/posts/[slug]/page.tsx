"use client";

import PostPageContent from './PostPageContent'; 
export default function SinglePostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto">
      
      <PostPageContent slug={params.slug} />
    </div>
  );
}