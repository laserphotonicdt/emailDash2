"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CampaignData = {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
};

export default function CampaignListingPage() {
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await fetch("/api/campaigns");
        if (!response.ok) {
          throw new Error("Failed to fetch campaign data");
        }
        const data = await response.json();
        setCampaignData(data);
      } catch (err) {
        setError("Error fetching campaign data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaignData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error: {error.message || "Unknown error occurred"}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Campaign Overview</h1>
      {campaignData && (
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{campaignData.sent}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{campaignData.delivered}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Opened</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{campaignData.opened}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Clicked</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{campaignData.clicked}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
