"use client";

import { useEffect, useState } from "react";
import { IUser } from "@/entities/IUser";
// import { UserLevel } from "@prisma/client"; // Uncomment if UserLevel is shown directly

interface UsersInformationProps {
  userId: number;
  onClose: () => void;
}

export const UsersInformation: React.FC<UsersInformationProps> = ({ userId, onClose }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to fetch user data for ID ${userId}`);
        }
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
        } else if (data && typeof data.id !== 'undefined') {
            setUser(data);
        }
        else {
          throw new Error(data.error || "User not found or invalid response structure.");
        }
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return "N/A";
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Invalid Date";
        return date.toLocaleDateString("en-EN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
    } catch (e) {
        return "Invalid Date";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-3xl p-8 shadow-lg my-4 lg:w-1/2 w-11/12 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mb-5 justify-self-center">
          <div className="text-cyan-900 text-center text-3xl lg:text-4xl font-extrabold font-maven">
          User Information
          </div>
        </div>
        <hr className="w-[100%] border-t-4 border-cyan-900 mb-6" />

        {isLoading && <p className="text-center text-gray-600">Loading user data...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        
        {user && !isLoading && !error && (
          <div className="space-y-1">
            <InfoItem label="Number" value={user.name} />
            <InfoItem label="Email" value={user.email} />
            <InfoItem label="Phone" value={user.phone} />
            <InfoItem label="User ID" value={user.id?.toString()} />
            <InfoItem label="User Level" value={user.level} />
            <InfoItem label="State" value={user.active ? "Active" : "Inactive"} highlight={user.active ? "green" : "red"} />
            <InfoItem label="Birthday" value={formatDate(user.birthday)} />
            <InfoItem label="Date of hire" value={formatDate(user.hireDate)} />
            <InfoItem label="Guard Card" value={user.guardCard ? "Yes" : "No"} />
            {user.contactName && <InfoItem label="Emergency Contact" value={user.contactName} />}
            {user.contactPhone && <InfoItem label="Emergency Phone" value={user.contactPhone} />}
            
            <h3 className="text-xl font-semibold text-cyan-800 pt-4 border-t border-gray-300 mt-4">Activity Counts</h3>
            <InfoItem label="Events as Supervisor" value={user.supervisorCount?.toString() ?? "0"} />
            <InfoItem label="Events as Manager" value={user.managerCount?.toString() ?? "0"} />
            <InfoItem label="Logistics Events" value={user.logisticCount?.toString() ?? "0"} />
            <InfoItem label="Events as Driver" value={user.driverCount?.toString() ?? "0"} />
            <InfoItem label="Dispatch Events" value={user.dispatchCount?.toString() ?? "0"} />
            <InfoItem label="Events such as Asist. Manager" value={user.assistantManagerCount?.toString() ?? "0"} />
          </div>
        )}
        
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            className="bg-gray-500 text-white font-bold px-6 py-2 rounded-md hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string | undefined | null;
  highlight?: "green" | "red";
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, highlight }) => {
  let valueClass = "text-gray-700";
  if (highlight === "green") valueClass = "text-green-600 font-semibold";
  if (highlight === "red") valueClass = "text-red-600 font-semibold";

  return (
    <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200 last:border-b-0">
      <dt className="text-sm font-medium text-gray-500 col-span-1">{label}:</dt>
      <dd className={`text-sm ${valueClass} col-span-2 break-words`}>{value || "N/A"}</dd>
    </div>
  );
};

export default UsersInformation;