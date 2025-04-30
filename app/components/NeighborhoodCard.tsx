import { Neighborhood, NeighborhoodSummary } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";

interface NeighborhoodCardProps {
  neighborhood: Neighborhood | NeighborhoodSummary;
  showDetails?: boolean;
}

export default function NeighborhoodCard({
  neighborhood,
  showDetails = false,
}: NeighborhoodCardProps) {
  return (
    <Link href={`/neighborhoods/${neighborhood.id}`}>
      <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-48">
          <Image
            priority={true}
            src={
              neighborhood.image_url ||
              "https://wflydwyikmbtytygvzjk.supabase.co/storage/v1/object/public/media/assets/neighborhood.jpg"
            }
            alt={neighborhood.name}
            height={400}
            width={500}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{neighborhood.name}</h3>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              {neighborhood.tip_count} housing tips
            </span>
            <span className="text-sm font-medium">
              {neighborhood.average_rent || "Rent varies"}
            </span>
          </div>

          {showDetails && "description" in neighborhood && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {neighborhood.description}
            </p>
          )}

          {"safety_rating" in neighborhood && (
            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < neighborhood.safety_rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs ml-1 text-gray-500">Safety</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
