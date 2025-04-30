"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { ImageUpload } from "./ImageUpload";
import { LocationPicker } from "./LocationPicker";

export default function AddNeighborHoodForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("{ lat: -1.2921, lng: 36.8219 }");
  const [commuteTime, setCommuteTime] = useState("");
  const [averageRent, setAverageRent] = useState("");
  const [safetyRating, setSafetyRating] = useState("");
  const [amenities, setAmenities] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const slug = name.toLowerCase().replace(/\s+/g, "-");

      const { error } = await supabase.from("neighborhoods").insert({
        name,
        slug,
        description,
        image_url: imageUrl,
        location: JSON.parse(location || "{}"),
        commute_time: commuteTime,
        average_rent: averageRent,
        safety_rating: safetyRating ? parseFloat(safetyRating) : null,
        amenities: amenities.split(",").map((item) => item.trim()),
        tip_count: 0,
        verified_residents: 0,
      });

      if (error) throw error;

      setName("");
      setDescription("");
      setImageUrl("");
      setLocation("{}");
      setCommuteTime("");
      setAverageRent("");
      setSafetyRating("");
      setAmenities("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add neighborhood"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>
      )}

      <div>
        <label className="block mb-1 font-medium">Neighborhood Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
          placeholder="e.g. Kileleshwa, Kilimani"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Brief description of the neighborhood"
        />
      </div>

      <div>
        <ImageUpload onUploadSuccess={setImageUrl} />
      </div>

      <div>
        <label className="block mb-1 font-medium">Location</label>
        <LocationPicker
          onLocationSelect={(lat, lng) =>
            setLocation(`{ lat: ${lat}, lng: ${lng} }`)
          }
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Commute Time</label>
        <input
          type="text"
          value={commuteTime}
          onChange={(e) => setCommuteTime(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="30 minutes to CBD"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Average Rent</label>
        <input
          type="text"
          value={averageRent}
          onChange={(e) => setAverageRent(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="KES 45,000"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Safety Rating (0-10)</label>
        <input
          type="number"
          value={safetyRating}
          onChange={(e) => setSafetyRating(e.target.value)}
          className="w-full p-2 border rounded"
          step="0.1"
          min="0"
          max="10"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Amenities (comma-separated)
        </label>
        <input
          type="text"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="School, Hospital, Mall"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add Neighborhood"}
      </button>
    </form>
  );
}
