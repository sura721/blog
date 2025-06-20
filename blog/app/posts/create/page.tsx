// /app/posts/create/page.tsx
import PostForm from "@/components/Form/Admin/PostForm";

const CreatePostPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <PostForm />
    </div>
  );
};

export default CreatePostPage;