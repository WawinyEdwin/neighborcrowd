"use client";

import { useState } from "react";
import { searchBuildings } from "../lib/services/buildingprofiles";
import { BuildingProfileSearch } from "../lib/types";



export default function BuildingSearch({
  neighborhoodId,
}: {
  neighborhoodId?: string;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BuildingProfileSearch[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (query.length < 2) return;
    setIsSearching(true);
    const buildings = await searchBuildings(query, neighborhoodId);
    setResults(buildings);
    setIsSearching(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search buildings..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <div className="rounded-lg p-2 max-h-60 overflow-y-auto">
          {results.map((building) => (
            <div
              key={building.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {building.name}
              <span className="text-sm text-gray-500 ml-2">
                {building.neighborhood_id}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
