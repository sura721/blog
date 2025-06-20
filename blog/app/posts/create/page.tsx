import PostFormLoader from "@/components/PostFormLoader";

const CreatePostPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <PostFormLoader />
    </div>
  );
};

export default CreatePostPage;