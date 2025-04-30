"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

interface HousingTipFormProps {
  userId: string | undefined;
  initialData?: {
    building_name?: string;
    neighborhood_id?: string;
    description?: string;
    contact_info?: string;
    availability?: boolean;
    images?: string[];
  };
}

export default function HousingTipForm({
  userId,
  initialData,
}: HousingTipFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    building_name: initialData?.building_name || "",
    neighborhood_id: initialData?.neighborhood_id || "",
    description: initialData?.description || "",
    contact_info: initialData?.contact_info || "",
    availability: initialData?.availability ?? true,
    images: initialData?.images || ([] as string[]),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("housing_tips").insert({
        ...formData,
        user_id: userId,
        verified: false,
        verification_count: 0,
      });

      if (error) throw error;

      router.push("/dashboard");
      router.refresh(); // Refresh to show new tip
    } catch (error) {
      console.error("Error submitting tip:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div>
        <label className="block mb-1 font-medium">Building Name</label>
        <input
          type="text"
          value={formData.building_name}
          onChange={(e) =>
            setFormData({ ...formData, building_name: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Neighborhood</label>
        <select
          value={formData.neighborhood_id}
          onChange={(e) =>
            setFormData({ ...formData, neighborhood_id: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a neighborhood</option>
          <option value="kileleshwa">Kileleshwa</option>
          <option value="kilimani">Kilimani</option>
          <option value="westlands">Westlands</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded"
          rows={4}
          required
          placeholder="Describe the unit, amenities, and any important details"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Contact Information</label>
        <input
          type="text"
          value={formData.contact_info}
          onChange={(e) =>
            setFormData({ ...formData, contact_info: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
          placeholder="How should potential renters contact you?"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="availability"
          checked={formData.availability}
          onChange={(e) =>
            setFormData({ ...formData, availability: e.target.checked })
          }
          className="mr-2"
        />
        <label htmlFor="availability">Currently Available</label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Tip"}
      </button>
    </form>
  );
}
