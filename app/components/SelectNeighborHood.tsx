"use client";

import { useState } from "react";
import AddNeighborhoodForm from "./AddNeighborHoodForm";

export default function NeighborhoodSelect({
  value,
  onChange,
  hoods,
}: {
  value: string;
  onChange: (value: string) => void;
  hoods: { id: string; name: string }[];
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [neighborhoods, setNeighborhoods] = useState(hoods);

  const handleAddSuccess = (newNeighborhood: { id: string; name: string }) => {
    setNeighborhoods([...neighborhoods, newNeighborhood]);
    onChange(newNeighborhood.id);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select a neighborhood</option>
        {neighborhoods.map((neighborhood) => (
          <option key={neighborhood.id} value={neighborhood.id}>
            {neighborhood.name}
          </option>
        ))}
      </select>

      {!showAddForm ? (
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add new neighborhood
        </button>
      ) : (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <AddNeighborhoodForm
            onSuccess={() =>
              handleAddSuccess({ id: "new-id", name: "New Name" })
            }
          />
          <button
            type="button"
            onClick={() => setShowAddForm(false)}
            className="mt-2 text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
