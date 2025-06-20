// /components/Form/Admin/PostForm.tsx
'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UploadDropzone } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
}

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) { return null; }
  return (
    <div className="border border-input bg-transparent rounded-t-lg p-2 flex items-center gap-1 tiptap">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded-md hover:bg-accent hover:text-accent-foreground ${editor.isActive('bold') ? 'is-active' : ''}`}>Bold</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded-md hover:bg-accent hover:text-accent-foreground ${editor.isActive('italic') ? 'is-active' : ''}`}>Italic</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded-md hover:bg-accent hover:text-accent-foreground ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}>H2</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded-md hover:bg-accent hover:text-accent-foreground ${editor.isActive('bulletList') ? 'is-active' : ''}`}>List</button>
    </div>
  );
};

const TiptapEditor = ({ content, onChange }: { content: string; onChange: (richText: string) => void; }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: content,
    editorProps: { attributes: { class: 'prose dark:prose-invert max-w-none focus:outline-none border-x border-b border-input bg-transparent rounded-b-lg p-4 min-h-[300px]' } },
    onUpdate({ editor }) { onChange(editor.getHTML()); },
  });
  return (<div><Toolbar editor={editor} /><EditorContent editor={editor} /></div>);
};

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryId) { alert("Please select a category."); return; }
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, image: imageUrl, published, categoryId }),
      });

      if (!res.ok) throw new Error(await res.text());
      const post = await res.json();
      router.push(`/posts/${post.slug}`);
    } catch (error) {
      alert('Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-2">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring" required />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-muted-foreground mb-2">Category</label>
          <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full p-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring" required>
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => ( <option key={cat.id} value={cat.id}>{cat.name}</option>))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">Post Image</label>
        {imageUrl ? (
          <div className='relative w-full h-80 rounded-lg overflow-hidden border border-input'>
            <Image 
              src={imageUrl} 
              alt="Uploaded Post Image" 
              fill 
              style={{ objectFit: 'cover' }} // <-- THIS IS THE FIX FOR THE IMAGE
            />
          </div>
        ) : (
          <UploadDropzone<OurFileRouter, 'postImage'>
            endpoint="postImage"
            onClientUploadComplete={(res) => { if (res?.[0]?.url) setImageUrl(res[0].url); }}
            onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)}
            appearance={{ 
              container: "border-2 border-dashed border-input rounded-lg p-8", 
              button: "bg-primary text-primary-foreground",
              label: "text-muted-foreground",
              uploadIcon: "text-muted-foreground"
            }}
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">Content</label>
        <TiptapEditor content={content} onChange={(richText) => setContent(richText)} />
      </div>
      <div className="flex items-center p-4 border border-input rounded-lg bg-card">
        <input type="checkbox" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)} className="h-5 w-5 rounded border-input text-primary focus:ring-ring" />
        <label htmlFor="published" className="ml-3 block text-sm font-medium text-card-foreground">Publish this post immediately</label>
      </div>
      <button type="submit" disabled={isSubmitting || !title || !content || !categoryId} className="w-full py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-lg">
        {isSubmitting ? 'Publishing...' : 'Publish Post'}
      </button>
    </form>
  );
}