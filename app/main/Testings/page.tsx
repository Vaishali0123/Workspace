"use client";

import { useAuthContext } from "@/app/Auth/Components/auth";
import { API } from "@/app/utils/helpers";
import { axios } from "../../utils/comimports";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface StoreDetails {
  houseNo: string;
  city: string;
  state: string;
  pincode: number;
  landmark: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  gst: string;
  businesscategory: string;
  documenttype: string;
  documentfile: string;
}

interface StoreRequest {
  _id: string;
  status: string;
  storeDetails: StoreDetails;
}

const Page = () => {
  const [requests, setRequests] = useState<StoreRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [approving, setApproving] = useState<string | null>(null); // Tracks which request is being approved
  const [message, setMessage] = useState<string | null>(null);

  const { data } = useAuthContext();
  const userId = data?.id;

  // Function to fetch requests
  useEffect(() => {
    if (!userId) return;

    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API}/requests/${userId}`);
        setRequests(response.data.data);
      } catch (err: unknown) {
        let errmsg = "Failed to fetch store requests";
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          errmsg = err.response?.data?.message;
        }
        toast.error(errmsg);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userId]);

  // Function to approve a specific request
  const handleApprove = async (requestId: string) => {
    if (!userId) return;

    setApproving(requestId);
    setMessage(null);

    try {
      const response = await axios.post(`${API}/submitrequests/${requestId}`, {
        requestId,
      });

      if (response.data.success) {
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req._id === requestId ? { ...req, status: "approved" } : req
          )
        );

        setMessage(response.data.message);
      }
    } catch (err: unknown) {
      let errmsg = "Failed to fetch store requests";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errmsg = err.response?.data?.message;
      }
      toast.error(errmsg);
    } finally {
      setApproving(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading store requests...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 p-6">
        <p>{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Store Requests</h1>

      {requests.length === 0 ? (
        <p>No store requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    request.status === "accepted"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {request.status}
                </span>
              </p>
              <p>
                <strong>City:</strong> {request.storeDetails.city}
              </p>
              <p>
                <strong>State:</strong> {request.storeDetails.state}
              </p>
              <p>
                <strong>GST:</strong> {request.storeDetails.gst || "N/A"}
              </p>

              {request.status !== "accepted" && (
                <button
                  onClick={() => handleApprove(request._id)}
                  disabled={approving === request._id}
                  className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                  {approving === request._id
                    ? "Approving..."
                    : "Approve Request"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {message && <p className="text-green-600 mt-4">{message}</p>}
    </div>
  );
};

export default Page;
