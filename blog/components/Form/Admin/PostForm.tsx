"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";

// --- SHADCN UI IMPORTS ---
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// --- END SHADCN UI IMPORTS ---

interface Category {
  id: string;
  name: string;
}

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  // Toolbar remains the same, it uses standard buttons and Tailwind classes
  return (
    <div className="border border-input bg-transparent rounded-t-lg p-2 flex items-center gap-1 tiptap">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-md hover:bg-accent hover:text-accent-foreground ${
          editor.isActive("bold") ? "is-active" : ""
        }`}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded-md hover:bg-accent hover:text-accent-foreground ${
          editor.isActive("italic") ? "is-active" : ""
        }`}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-md hover:bg-accent hover:text-accent-foreground ${
          editor.isActive("heading", { level: 2 }) ? "is-active" : ""
        }`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-md hover:bg-accent hover:text-accent-foreground ${
          editor.isActive("bulletList") ? "is-active" : ""
        }`}
      >
        List
      </button>
    </div>
  );
};

const TiptapEditor = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: content,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none focus:outline-none border-x border-b border-input bg-transparent rounded-b-lg p-4 min-h-[300px]",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        alert("Could not load categories. Please try refreshing the page.");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryId) {
      alert("Please select a category.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, image: imageUrl, published, categoryId }),
      });
      if (!res.ok) throw new Error(await res.text());
      const post = await res.json();
      router.push(`/posts/${post.slug}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong during post submission!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Title and Category Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., How to Build a Great Blog"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="category">Category</Label>
          <Select required value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Post Image</Label>
        {isUploading || imageUrl ? (
          <div className="relative flex flex-col items-center justify-center aspect-video w-full rounded-lg overflow-hidden border border-input bg-muted/50 p-4">
            {imageUrl && !isUploading ? (
              <Image src={imageUrl} alt="Uploaded Post Image" fill className="object-cover" />
            ) : (
              <>
                <Progress value={uploadProgress} className="w-4/5" />
                <p className="mt-2 text-sm text-muted-foreground">Uploading: {uploadProgress}%</p>
              </>
            )}
          </div>
        ) : (
          <UploadDropzone<OurFileRouter, "postImage">
            endpoint="postImage"
            onUploadBegin={() => setIsUploading(true)}
            onUploadProgress={setUploadProgress}
            onClientUploadComplete={(res) => {
              if (res?.[0]?.url) setImageUrl(res[0].url); // Use `url` not `ufsUrl`
              setIsUploading(false);
              setUploadProgress(0);
            }}
            onUploadError={(error: Error) => {
              setIsUploading(false);
              setUploadProgress(0);
              alert(`ERROR! ${error.message}`);
            }}
            appearance={{
              container: "border-2 border-dashed border-input rounded-lg p-8",
              button: "bg-primary text-primary-foreground",
            }}
          />
        )}
      </div>

      <div>
        <Label className="mb-2 block">Content</Label>
        <TiptapEditor content={content} onChange={(richText) => setContent(richText)} />
      </div>

      <div className="flex items-center space-x-2 p-4 border border-input rounded-lg bg-card">
        <Checkbox id="published" checked={published} onCheckedChange={(checked) => setPublished(!!checked)} />
        <Label htmlFor="published" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Publish this post immediately
        </Label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || isUploading || !title || !content || !categoryId}
        size="lg"
      >
        {isSubmitting ? "Publishing..." : isUploading ? "Uploading..." : "Publish Post"}
      </Button>
    </form>
  );
}