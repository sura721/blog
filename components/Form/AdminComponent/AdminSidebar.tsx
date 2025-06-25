"use client";

import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiChartPie, HiDocumentText, HiUserGroup, HiTag, HiChatAlt2 } from "react-icons/hi";
import Link from "next/link";

interface AdminSidebarProps {
  onItemClick?: () => void;
}

export function AdminSidebar({ onItemClick }: AdminSidebarProps) {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <Sidebar aria-label="Admin sidebar for blog" className="h-full">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem as={Link} href="/admin" icon={HiChartPie} onClick={handleClick}>
            Dashboard
          </SidebarItem>

          <SidebarCollapse icon={HiDocumentText} label="Posts">
            <SidebarItem as={Link} href="/admin/posts" onClick={handleClick}>
              All Posts
            </SidebarItem>
            <SidebarItem as={Link} href="/admin/posts/create" onClick={handleClick}>
              Add New Post
            </SidebarItem>
          </SidebarCollapse>

         <SidebarCollapse icon={HiTag} label="Catagory">
            <SidebarItem as={Link} href="/admin/categories" onClick={handleClick}>
              All Categories
            </SidebarItem >
            <SidebarItem as={Link} href="/admin/category/create" onClick={handleClick}>
              Add New category
            </SidebarItem>
          </SidebarCollapse>
          

          <SidebarItem as={Link} href="/admin/comments" icon={HiChatAlt2} onClick={handleClick}>
            Comments
          </SidebarItem>

          <SidebarItem as={Link} href="/admin/users" icon={HiUserGroup} onClick={handleClick}>
            Users
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}