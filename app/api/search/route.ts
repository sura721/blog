import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// This function handles GET requests to /api/search
export async function GET(request: NextRequest) {
  // Get the search query from the URL, e.g., /api/search?q=my-query
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  // If no query is provided, return an error
  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    );
  }

  try {
    const posts = await prisma.post.findMany({
      // We limit the results to a reasonable number for a dropdown
      take: 5,
      where: {
        // Only search for posts that are published
        published: true,
        // The 'OR' condition allows searching across multiple fields
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            content: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            author: {
              username: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      // Select only the fields needed for the dropdown to keep the response light
      select: {
        id: true,
        title: true,
        slug: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}