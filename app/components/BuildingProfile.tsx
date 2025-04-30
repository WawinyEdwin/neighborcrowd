import { BuildingProfile as BuildingProfileType } from "@/app/lib/types";
import Link from "next/link";

export default function BuildingProfile({
  building,
}: {
  building: BuildingProfileType;
}) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="mt-4">
        <Link
          href={`/tips/submit?building=${building.name}&neighborhood=${building.neighborhood_id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          Report availability in this building
        </Link>
      </div>
      <h3 className="font-semibold text-lg mb-2">{building.name}</h3>
      <p className="text-gray-600 mb-3">{building.description}</p>

      <div className="mb-3">
        <h4 className="font-medium mb-1">Amenities</h4>
        <div className="flex flex-wrap gap-2">
          {building.amenities.map((amenity, index) => (
            <span key={index} className="bg-gray-100 px-2 py-1 text-xs rounded">
              {amenity}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <div>
          <span className="font-medium">Landlord Rating: </span>
          <span>{building.landlord_rating}/5</span>
        </div>
        <div>
          <span className="font-medium">Overall Rating: </span>
          <span>{building.overall_rating}/5</span>
        </div>
      </div>
    </div>
  );
}
