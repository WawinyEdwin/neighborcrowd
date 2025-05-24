import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import BuildingProfile from "@/app/components/BuildingProfile";
import BuildingSearchWrapper from "@/app/components/BuildingSearchWrapper";
import ContributorCard from "@/app/components/ContributorCard";
import NeighborhoodCard from "@/app/components/NeighborhoodCard";
import HousingTipCard from "@/app/components/VacancyCard";
import { getBuildingsByNeighborhood } from "@/app/lib/services/buildingprofiles"; // Add this import
import { getHousingTips } from "@/app/lib/services/housingtips";
import {
  getNeighborhoodById,
  getTopContributors,
} from "@/app/lib/services/neighborhoods";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userId = session?.user?.profile?.id;

  const neighborhood = await getNeighborhoodById(id);
  if (!neighborhood) redirect("/neighborhoods");

  const [tips, contributors, buildings] = await Promise.all([
    getHousingTips(id),
    getTopContributors(id),
    getBuildingsByNeighborhood(id),
  ]);

  return (
    <div className="container mx-auto p-4">
      <br />
      <div className="mb-8">
        <NeighborhoodCard neighborhood={neighborhood} showDetails={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">
              Find Buildings in {neighborhood.name}
            </h2>
            <BuildingSearchWrapper neighborhoodId={id} />
          </div>
          {buildings.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Popular Buildings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {buildings.map((building) => (
                  <BuildingProfile key={building.id} building={building} />
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link
                  href={`/buildings?neighborhood=${id}`}
                  className="text-blue-600 hover:underline"
                >
                  View all buildings in {neighborhood.name} →
                </Link>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Housing Tips</h2>
            <Link
              href={`/tips/submit?neighborhood=${neighborhood.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Share a Vacancy
            </Link>
          </div>

          {tips.length > 0 ? (
            <div className="space-y-4">
              {tips.map((tip) => (
                <HousingTipCard key={tip.id} tip={tip} userId={userId} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tips yet for this neighborhood</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Top Contributors</h2>
          {contributors.length > 0 ? (
            <div className="space-y-4">
              {contributors.map((contributor) => (
                <ContributorCard
                  key={contributor.id}
                  contributor={contributor}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No active contributors yet</p>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium mb-2">About {neighborhood.name}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-600">Average Rent:</span>
                <span>{neighborhood.average_rent}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Commute to CBD:</span>
                <span>{neighborhood.commute_time}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Safety Rating:</span>
                <span>{neighborhood.safety_rating}/5</span>
              </li>
            </ul>

            <h4 className="font-medium mt-4 mb-2">Key Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {neighborhood.amenities &&
                neighborhood.amenities.length > 0 &&
                neighborhood.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-white px-3 py-1 rounded-full text-xs shadow-sm"
                  >
                    {amenity}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
