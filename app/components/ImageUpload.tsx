"use client";

import { supabase } from "@/app/lib/supabase";
import { useState } from "react";

export const ImageUpload = ({
  onUploadSuccess,
}: {
  onUploadSuccess: (url: string) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const { data, error } = await supabase.storage
        .from("neighborhood-images")
        .upload(`neighborhoods/${file.name}`, file);

      if (error) throw error;

      const publicUrl = supabase.storage
        .from("neighborhood-images")
        .getPublicUrl(data?.path || "");

      onUploadSuccess(publicUrl?.data?.publicUrl || "");
    } catch (err) {
      console.error(err);
      setError("Upload failed, please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="mb-2"
      />
      {file && <div>Selected: {file.name}</div>}
      {error && <div className="text-red-500">{error}</div>}
      <button
        onClick={handleUpload}
        disabled={isUploading || !file}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isUploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};
