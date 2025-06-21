import PostPageContent from "@/components/PostPageContent";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function SinglePostPage({ params }: PageProps) {
  return (
    <div className="container mx-auto">
      <PostPageContent slug={params.slug} />
    </div>
  );
}
