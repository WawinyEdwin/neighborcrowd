import NeighborhoodCard from "@/app/components/NeighborhoodCard";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import HousingTipCard from "../components/VacancyCard";
import { getLatestHousingTips } from "../lib/services/housingtips";
import { getNeighborHoods } from "../lib/services/neighborhoods";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.profile?.id;

  if (!session) {
    redirect("/login");
  }

  const neighborhoods = await getNeighborHoods(8);

  const recentTips = await getLatestHousingTips();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {session?.user?.name}
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Featured Neighborhoods</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {neighborhoods?.map((neighborhood) => (
            <NeighborhoodCard
              key={neighborhood.id}
              neighborhood={neighborhood}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Housing Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {recentTips?.map((tip) => (
            <HousingTipCard key={tip.id} tip={tip} userId={userId} />
          ))}
        </div>
      </section>
      <div className="fixed bottom-6 right-6">
        <Link
          href="/tips/submit"
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center"
        >
          <FaPlus className="h-6 w-6" />
          <span className="sr-only">Add Housing Tip</span>
        </Link>
      </div>
    </div>
  );
}
