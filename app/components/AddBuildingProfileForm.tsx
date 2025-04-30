"use client";

import { supabase } from "@/app/lib/supabase";
import { useState } from "react";

export default function AddBuildingProfileForm({
  onSuccess,
}: {
  onSuccess?: (newProfile: { id: string; name: string }) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    amenities: "",
    landlord_rating: "",
    overall_rating: "",
    neighborhood_id: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const id = ""
      const created_at = new Date().toISOString();
      const amenitiesArray = form.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const { error } = await supabase.from("building_profiles").insert({
        id,
        name: form.name,
        description: form.description,
        amenities: amenitiesArray,
        landlord_rating: parseFloat(form.landlord_rating),
        overall_rating: parseFloat(form.overall_rating),
        neighborhood_id: form.neighborhood_id,
        created_at,
      });

      if (error) throw error;

      if (onSuccess) {
        onSuccess({
          id,
          name: form.name,
        });
      }

      setForm({
        name: "",
        description: "",
        amenities: "",
        landlord_rating: "",
        overall_rating: "",
        neighborhood_id: "",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add building profile"
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
        <label className="block mb-1 font-medium">Building Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={2}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Amenities (comma-separated)
        </label>
        <textarea
          name="amenities"
          value={form.amenities}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={2}
          placeholder="e.g. Parking, Balcony, CCTV"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">
            Landlord Rating (0-5)
          </label>
          <input
            name="landlord_rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={form.landlord_rating}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Overall Rating (0-5)</label>
          <input
            name="overall_rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={form.overall_rating}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add Building"}
      </button>
    </form>
  );
}
