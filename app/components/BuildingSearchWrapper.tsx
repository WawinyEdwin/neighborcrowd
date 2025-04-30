"use client";

import BuildingSearch from "./BuildingSearch";

interface BuildingSearchWrapperProps {
  neighborhoodId?: string;
}

export default function BuildingSearchWrapper({
  neighborhoodId,
}: BuildingSearchWrapperProps) {
  return <BuildingSearch neighborhoodId={neighborhoodId} />;
}
