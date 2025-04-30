import NeighborhoodCard from "@/app/components/NeighborhoodCard";
import { getNeighborhoods } from "@/app/lib/services/neighborhoods";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neighbour Hoods",
  description: "Real places, habited by real people",
};


export default async function NeighborhoodsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const neighborhoods = await getNeighborhoods();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Explore Neighborhoods</h1>
        <div className="text-sm text-gray-500">
          {neighborhoods.length} areas with housing tips
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {neighborhoods.map((neighborhood) => (
          <NeighborhoodCard
            key={neighborhood.id}
            neighborhood={neighborhood}
            showDetails={true}
          />
        ))}
      </div>
    </div>
  );
}
