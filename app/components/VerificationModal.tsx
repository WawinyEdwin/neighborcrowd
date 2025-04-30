"use client";

import { useState } from "react";
import { Verification } from "../lib/types";

export default function VerificationModal({
  isOpen,
  onClose,
  verifications,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  verifications: Verification[];
  onSubmit: (verified: boolean, comment?: string) => void;
}) {
  const [comment, setComment] = useState("");
  const [action, setAction] = useState<"verify" | "dispute">("verify");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">
          {action === "verify" ? "Verify this tip" : "Dispute this tip"}
        </h3>

        <div className="mb-4">
          <label className="block mb-2">Comment (optional)</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>

        <div className="flex justify-between mb-4">
          <button
            onClick={() =>
              setAction(action === "verify" ? "dispute" : "verify")
            }
            className="text-sm text-blue-600 hover:underline"
          >
            {action === "verify"
              ? "Want to dispute instead?"
              : "Want to verify instead?"}
          </button>
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={() => onSubmit(action === "verify", comment)}
            className={`px-4 py-2 rounded text-white ${
              action === "verify" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {action === "verify" ? "Confirm Verification" : "Submit Dispute"}
          </button>
        </div>

        {verifications.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-2">Previous Verifications</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {verifications.map((v) => (
                <div key={v.id} className="p-2 border-b">
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {v.user_profiles?.name || "Anonymous"}
                    </span>
                    <span
                      className={`text-sm ${
                        v.verified ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {v.verified ? "Verified" : "Disputed"}
                    </span>
                  </div>
                  {v.comment && (
                    <p className="text-sm text-gray-600 mt-1">
                      &quot;{v.comment}&quot;
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
