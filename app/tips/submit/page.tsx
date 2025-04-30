import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HousingTipCard from "@/app/components/HousingTipCard";
import HousingTipForm from "@/app/components/HousingTipForm";
import { getLatestHousingTips } from "@/app/lib/services/housingtips";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contribute Housing Tip",
  description: "Share with the community information about a vacancy near you",
};

export default async function SubmitTipPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/tips/submit");
  }

  const userId = session?.user?.profile?.id;

  const latestTips = await getLatestHousingTips();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h1 className="text-2xl font-bold mb-6">Submit a Housing Tip</h1>
          <HousingTipForm userId={session.user.profile?.id} />
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Latest Housing Tips</h2>
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
