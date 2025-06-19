import PostForm from "@/components/Form/Admin/PostForm";

export default function CreatePostPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <PostForm />
    </div>
  );
}