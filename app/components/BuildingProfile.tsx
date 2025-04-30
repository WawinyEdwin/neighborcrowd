import { BuildingProfileInfo } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaMapMarkerAlt,
  FaRegStar,
  FaShower,
  FaStar,
} from "react-icons/fa";

export default function BuildingProfile({
  building,
}: {
  building: BuildingProfileInfo;
}) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Building Image Header */}
      {building.image_url && (
        <div className="relative h-48">
          <Image
            src={building.image_url}
            alt={building.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg mb-1">{building.name}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <FaMapMarkerAlt className="mr-1" />
            <span>{building.neighborhood?.name || "Nairobi"}</span>
          </div>
        </div>

        <div className="flex items-center my-2">
          {[...Array(5)].map((_, i) =>
            i < Math.floor(building.overall_rating) ? (
              <FaStar key={i} className="text-yellow-400" />
            ) : (
              <FaRegStar key={i} className="text-yellow-400" />
            )
          )}
          <span className="ml-1 text-sm text-gray-600">
            ({building.review_count || 0} reviews)
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {building.description}
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center">
            <FaBed className="mr-2 text-gray-500" />
            <span>Units: {building.unit_count || "N/A"}</span>
          </div>
          <div className="flex items-center">
            <FaShower className="mr-2 text-gray-500" />
            <span>Water: {building.water_availability || "N/A"}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-medium mb-2">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {building.amenities &&
              building.amenities.length > 0 &&
              building.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs"
                >
                  {amenity}
                </span>
              ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Link
            href={`/tips/submit?building=${building.name}&neighborhood=${building.neighborhood?.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Report Availability
          </Link>
          <Link
            href={`/buildings/${building.id}`}
            className="flex-1 border border-blue-600 text-blue-600 text-center py-2 px-4 rounded hover:bg-blue-50 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
