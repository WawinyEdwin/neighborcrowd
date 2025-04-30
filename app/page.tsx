import NeighborhoodCard from "@/app/components/NeighborhoodCard";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FcCollaboration, FcHome, FcLike, FcSurvey } from "react-icons/fc";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getNeighborhoods } from "./lib/services/neighborhoods";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  const neighborhoods = await getNeighborhoods();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect Home in Nairobi
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Crowdsourced housing information from real residents - no agents, no
            fake listings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Join the Community
            </Link>
            <Link
              href="#neighborhoods"
              className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Explore Neighborhoods
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Our Community Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FcHome className="text-4xl mb-4" />,
                title: "Real Listings",
                description: "Verified by actual residents in the buildings",
              },
              {
                icon: <FcCollaboration className="text-4xl mb-4" />,
                title: "Community Power",
                description: "Collective knowledge beats individual searching",
              },
              {
                icon: <FcSurvey className="text-4xl mb-4" />,
                title: "Honest Reviews",
                description: "Get the truth about landlords and management",
              },
              {
                icon: <FcLike className="text-4xl mb-4" />,
                title: "Help Others",
                description: "Earn rewards for contributing information",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods Preview */}
      <section id="neighborhoods" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Neighborhoods</h2>
            <Link
              href="/neighborhoods"
              className="text-blue-600 hover:underline"
            >
              View all neighborhoods →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.map((neighborhood) => (
              <NeighborhoodCard
                key={neighborhood.id}
                neighborhood={neighborhood}
                showDetails={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Join the Community",
                description: "Sign up with your Google account to get started",
              },
              {
                step: "2",
                title: "Explore or Contribute",
                description:
                  "Either search for housing or share tips about your current residence",
              },
              {
                step: "3",
                title: "Earn Rewards",
                description:
                  "Get points for verified tips that you can redeem for benefits",
              },
              {
                step: "4",
                title: "Find Your Home",
                description:
                  "Connect directly with available units through our community network",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of Nairobi residents helping each other navigate the
            housing market
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
