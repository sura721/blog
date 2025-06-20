
import dynamic from 'next/dynamic';

const PostForm = dynamic(
  () => import('@/components/Form/Admin/PostForm'), 
  { 
    ssr: false,
    loading: () => <p>Loading form...</p> 
  }
);

const CreatePostPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <PostForm />
    </div>
  );
};

export default CreatePostPage;