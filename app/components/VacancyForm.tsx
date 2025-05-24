"use client";

import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BuildingSelect from "./SelectBuilding";
import NeighborHoodSelect from "./SelectNeighborHood";

interface HousingTipFormProps {
  userId: string | undefined;
  hoods: { id: string; name: string }[];
  buildings: { id: string; name: string }[];
  initialData?: {
    building_id?: string;
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
  hoods,
  buildings,
}: HousingTipFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    building_id: initialData?.building_id || "",
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
      router.refresh();
    } catch (error) {
      console.error("Error submitting tip:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div>
        <label className="block mb-1 font-medium">Building</label>
        <BuildingSelect
          value={formData.building_id}
          buildings={buildings}
          onChange={(value) => setFormData({ ...formData, building_id: value })}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Neighborhood</label>
        <NeighborHoodSelect
          value={formData.neighborhood_id}
          hoods={hoods}
          onChange={(value) =>
            setFormData({ ...formData, neighborhood_id: value })
          }
        />
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
        disabled={isSubmitting || !formData.building_id}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Share a Vacancy"}
      </button>
    </form>
  );
}
