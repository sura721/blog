import prisma from "@/lib/prisma";
import { IntroPageClient } from "@/components/IntroPageClient";
import sanitizeHtml from 'sanitize-html'; 
type FeaturedPost = {
  category: string;
  title: string;
  excerpt: string;
  slug: string;
};
export const dynamic = 'force-dynamic';


export default async function IntroPage() {
  const featuredPostsData = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 3,
    include: {
      category: true,
    },
  });

  const featuredPosts: FeaturedPost[] = featuredPostsData.map(post => {
    const plainTextContent = sanitizeHtml(post.content, {
      allowedTags: [], 
      allowedAttributes: {}, 
    });

    const excerpt = plainTextContent.substring(0, 120) + (plainTextContent.length > 120 ? '...' : '');

    return {
      category: post.category.name,
      title: post.title,
      excerpt: excerpt, 
      slug: post.slug,
    };
  });

  return <IntroPageClient featuredPosts={featuredPosts} />;
}