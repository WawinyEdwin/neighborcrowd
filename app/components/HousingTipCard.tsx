"use client";

import {
  getVerificationsForTip,
  getVerificationStatus,
  verifyTip,
} from "@/app/lib/services/verifications";
import { useEffect, useState } from "react";
import VerificationModal from "./VerificationModal";
import Image from "next/image";

export default function HousingTipCard({
  tip,
  userId,
}: {
  tip: any;
  userId: string | undefined;
}) {
  const [verificationState, setVerificationState] = useState({
    isVerified: false,
    verificationCount: 0,
    userVerified: null as boolean | null,
    showModal: false,
  });
  const [verifications, setVerifications] = useState<any[]>([]);

  useEffect(() => {
    const loadVerifications = async () => {
      const status = await getVerificationStatus(tip.id);
      setVerificationState((prev) => ({
        ...prev,
        isVerified: status.isVerified,
        verificationCount: status.verificationCount!,
      }));

      if (userId) {
        const userVerification = status.verifications.find(
          (v: any) => v.user_id === userId
        );
        if (userVerification) {
          setVerificationState((prev) => ({
            ...prev,
            userVerified: userVerification.verified,
          }));
        }
      }
    };
    loadVerifications();
  }, [tip.id, userId]);

  const handleVerification = async (verified: boolean, comment?: string) => {
    if (!userId) return;

    await verifyTip(tip.id, userId, verified, comment);
    const status = await getVerificationStatus(tip.id);
    setVerificationState((prev) => ({
      ...prev,
      isVerified: status.isVerified,
      verificationCount: status.verificationCount!,
      userVerified: verified,
      showModal: false,
    }));
  };

  const showVerificationDetails = async () => {
    const { verifications } = await getVerificationsForTip(tip.id);
    setVerifications(verifications || []);
    setVerificationState((prev) => ({ ...prev, showModal: true }));
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold">{tip.building_name}</h3>
          <p className="text-sm text-gray-500">
            {tip.neighborhoods?.name || "Unknown neighborhood"}
          </p>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded ${
            tip.availability
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {tip.availability ? "Available" : "Taken"}
        </span>
      </div>

      <p className="text-gray-600 mb-3">{tip.description}</p>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center">
          {tip.user_profiles?.avatar_url && (
            <Image
              src={tip.user_profiles.avatar_url}
              alt={tip.user_profiles.name}
              width={24}
              height={24}
              className="rounded-full mr-2"
            />
          )}
          <span className="text-gray-500">
            {tip.user_profiles?.name || "Anonymous"}
          </span>
        </div>
        <span className="text-gray-500">
          {new Date(tip.created_at).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {verificationState.isVerified ? (
            <span
              className="flex items-center text-green-600 cursor-pointer hover:underline"
              onClick={showVerificationDetails}
            >
              ✅ Verified ({verificationState.verificationCount})
            </span>
          ) : (
            <span className="text-gray-500">Not verified</span>
          )}
        </div>

        {userId && (
          <div className="flex space-x-2">
            {verificationState.userVerified === null ? (
              <>
                <button
                  onClick={() => handleVerification(true)}
                  className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200"
                >
                  Verify
                </button>
                <button
                  onClick={() =>
                    setVerificationState((prev) => ({
                      ...prev,
                      showModal: true,
                    }))
                  }
                  className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
                >
                  Dispute
                </button>
              </>
            ) : (
              <span className="text-sm">
                You {verificationState.userVerified ? "verified" : "disputed"}{" "}
                this
              </span>
            )}
          </div>
        )}
      </div>

      <VerificationModal
        isOpen={verificationState.showModal}
        onClose={() =>
          setVerificationState((prev) => ({ ...prev, showModal: false }))
        }
        verifications={verifications}
        onSubmit={handleVerification}
      />
    </div>
  );
}
