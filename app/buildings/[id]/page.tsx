import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import BuildingProfile from "@/app/components/BuildingProfile";
import HousingTipCard from "@/app/components/HousingTipCard";
import { getBuildingProfile } from "@/app/lib/services/buildingprofiles";
import { HousingTipWithUserProfile } from "@/app/lib/types";

import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function BuildingDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  const params = await props.params;
  const id = params.id;
  const building = await getBuildingProfile(id);
  if (!building) return notFound();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <BuildingProfile building={building} />
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Housing Tips</h2>
          {building.neighborhood.housing_tips?.length > 0 ? (
            <div className="space-y-4">
              {building.housing_tips.map((tip: HousingTipWithUserProfile) => (
                <HousingTipCard
                  key={tip.id}
                  tip={tip}
                  userId={session?.user?.profile?.id}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tips yet for this building</p>
          )}
        </div>
      </div>
    </div>
  );
}
