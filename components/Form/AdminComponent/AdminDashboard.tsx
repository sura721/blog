'use client'
import CategoryForm from "./CategoryForm"
import PostForm from "./PostForm"

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Creation Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CategoryForm />
        <PostForm />
      </div>
    </div>
  )
}