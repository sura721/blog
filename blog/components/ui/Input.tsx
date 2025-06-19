"use client";
import { TextInput } from "flowbite-react";

export function Input() {
  return (
    <TextInput
      placeholder="Search blogs..."
      color="gray"
      className="w-full max-w-md"
    />
  );
}
