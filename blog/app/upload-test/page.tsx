'use client';

import { UploadDropzone } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

export default function UploadTestPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Uploader Test Page</h1>
      <UploadDropzone<OurFileRouter, 'postImage'>
        endpoint="postImage"
        onClientUploadComplete={(res) => {
          console.log('Files: ', res);
          alert(`Upload Completed!`);
        }}
        onUploadError={(error: Error) => {
          alert(`UPLOAD FAILED: ${error.message}`);
        }}
      />
    </main>
  );
}