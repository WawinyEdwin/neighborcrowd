import Link from "next/link";
import Image from "next/image";

interface ContributorCardProps {
  contributor: {
    id: string;
    name: string;
    avatar_url?: string;
    points: number;
  };
}

export default function ContributorCard({ contributor }: ContributorCardProps) {
  return (
    <Link href={`/profile/${contributor.id}`}>
      <div className="flex items-center p-3 rounded-lg hover:bg-gray-50">
        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
          {contributor.avatar_url ? (
            <Image
              src={contributor.avatar_url}
              alt={contributor.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">
                {contributor.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{contributor.name}</h4>
          <p className="text-xs text-gray-500">{contributor.points} points</p>
        </div>
        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          Top Contributor
        </div>
      </div>
    </Link>
  );
}
