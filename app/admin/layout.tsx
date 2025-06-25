"use client";  

import { useState } from "react";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming this is from shadcn/ui
import { AdminSidebar } from "@/components/Form/AdminComponent/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 1. This function will be passed down to the sidebar
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* --- Desktop Sidebar (Visible on medium screens and up) --- */}
      <div className="hidden md:flex md:w-64 md:flex-shrink-0">
        <div className="flex h-full w-full flex-col border-r dark:border-gray-700">
          {/* We don't strictly need to pass the prop here, but it's good practice */}
          <AdminSidebar/>
        </div>
      </div>

      {/* --- Mobile Sidebar (Appears as an overlay) --- */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75" 
            aria-hidden="true"
            onClick={handleCloseSidebar} // Also close when clicking the backdrop
          ></div>
          
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-800">
            {/* 2. Pass the closing function to the mobile sidebar */}
            <AdminSidebar onItemClick={handleCloseSidebar} />
          </div>
        </div>
      )}

      {/* --- Main Content Area --- */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6 md:hidden">
          <span className="font-bold">Admin Panel</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open sidebar</span>
          </Button>
        </header>

        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}