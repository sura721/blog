"use client";

import PostPageContent from "@/components/PostPageContent";

type Params ={
  params:{
    slug:string
  }
}
export default function SinglePostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto">
      
      <PostPageContent slug={params.slug} />
    </div>
  );

}