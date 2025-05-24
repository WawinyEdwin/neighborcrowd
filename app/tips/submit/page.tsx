import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import HousingTipCard from "@/app/components/VacancyCard";
import HousingTipForm from "@/app/components/VacancyForm";
import { getAllBuildingProfiles } from "@/app/lib/services/buildingprofiles";
import { getLatestHousingTips } from "@/app/lib/services/housingtips";
import { getAllNeighborHoods } from "@/app/lib/services/neighborhoods";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contribute Housing Tip",
  description: "Share with the community information about a vacancy near you",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?callbackUrl=/tips/submit");
  }

  const [hoods, buildings] = await Promise.all([
    getAllNeighborHoods(),
    getAllBuildingProfiles(),
  ]);

  const userId = session?.user?.profile?.id;
  const latestTips = await getLatestHousingTips();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h1 className="text-2xl font-bold mb-6">Share a Vacancy</h1>
          <HousingTipForm
            userId={session.user.profile?.id}
            hoods={hoods}
            buildings={buildings}
          />
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Latest Vacancies</h2>
          {latestTips.length > 0 ? (
            <div className="space-y-4">
              {latestTips.map((tip) => (
                <HousingTipCard key={tip.id} tip={tip} userId={userId} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No tips available yet. Be the first to contribute!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
