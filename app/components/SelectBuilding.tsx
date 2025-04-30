"use client";

import { useState } from "react";
import { IdAndName } from "../lib/types";
import AddBuildingProfileForm from "./AddBuildingProfileForm";

export default function BuildingSelect({
  value,
  onChange,
  buildings,
}: {
  value: string;
  onChange: (value: string) => void;
  buildings: IdAndName[];
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [buildingProfiles, setBuildingProfiles] = useState(buildings);

  const handleAddSuccess = (newProfile: IdAndName) => {
    setBuildingProfiles([...buildingProfiles, newProfile]);
    onChange(newProfile.id);
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
        <option value="">Select a building</option>
        {buildingProfiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.name}
          </option>
        ))}
      </select>

      {!showAddForm ? (
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add new building
        </button>
      ) : (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <AddBuildingProfileForm
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
