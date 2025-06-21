import { Input } from "./input";
export function SearchInput() { 
  return (
    <Input
      type="search"
      placeholder="Search blogs..."
      className="w-full max-w-md"
    />
  );
}