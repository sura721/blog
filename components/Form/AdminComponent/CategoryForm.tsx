"use client";
import { useState } from "react";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdCategory, setCreatedCategory] = useState<{ id: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setCreatedCategory(null);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setCreatedCategory(data);
      setName("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Step 2: Create Category</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isLoading ? "Creating..." : "Create Category"}
        </button>
        {error && <p className="text-red-500 font-bold">{error}</p>}
        {createdCategory && (
          <div className="mt-4 p-2 bg-green-100 border-l-4 border-green-500">
            <p className="font-bold text-green-800">
              Success! Category ID (click to copy):
            </p>
            <pre
              className="text-sm font-mono cursor-pointer"
              onClick={() => navigator.clipboard.writeText(createdCategory.id)}
            >
              {createdCategory.id}
            </pre>
          </div>
        )}
      </form>
    </div>
  );
}
