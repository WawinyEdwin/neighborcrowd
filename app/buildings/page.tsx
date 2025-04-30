"use client";

import { useState } from "react";
import BuildingSearchWrapper from "../components/BuildingSearchWrapper";

export default function BuildingsPage() {
  const [selectedNeighborhood] = useState<string>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Find Buildings in Nairobi</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <BuildingSearchWrapper neighborhoodId={selectedNeighborhood} />
        </div>
      </div>
    </div>
  );
}
