import PostForm from "@/components/Form/Admin/PostForm";
import Link from "next/link";
export default function Home() {
  return (
    <main className="p-6 flex jestify-center items-center min-h-screen bg-gray-100">
      {/* <h1 className="text-2xl font-bold mb-4">Create a Post</h1> */}
      
     <div className="flex gap-2.5"> <Link href={'/posts/create'}>create post</Link>  <br /> 
         <Link href={'/category/create'}>create catagory</Link></div>
    </main>
  );
}
