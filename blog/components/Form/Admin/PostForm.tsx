"use client";
import { useState } from "react";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [published, setPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdPost, setCreatedPost] = useState<object | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setCreatedPost(null);
    const payload = {
      title,
      slug,
      content,
      authorId,
      categoryId,
      image: image || undefined,
      published,
    };
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setCreatedPost(data);
      setTitle("");
      setSlug("");
      setContent("");
      setAuthorId("");
      setCategoryId("");
      setImage("");
      setPublished(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Step 3: Create Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          placeholder="Author ID (from Step 1)"
          required
          className="p-2 border rounded"
        />
        <input
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          placeholder="Category ID (from Step 2)"
          required
          className="p-2 border rounded"
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          required
          className="p-2 border rounded"
        />
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Post Slug (e.g. my-new-post)"
          required
          className="p-2 border rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post Content"
          required
          className="p-2 border rounded h-24"
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL (optional)"
          className="p-2 border rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />{" "}
          Publish immediately
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {isLoading ? "Creating..." : "Create Post"}
        </button>
        {error && <p className="text-red-500 font-bold">{error}</p>}
        {createdPost && (
          <div className="mt-4 p-2 bg-green-100 border-l-4 border-green-500">
            <p className="font-bold text-green-800">Success! Post created:</p>
            <pre className="text-sm font-mono overflow-x-auto">
              {JSON.stringify(createdPost, null, 2)}
            </pre>
          </div>
        )}
      </form>
    </div>
  );
}
