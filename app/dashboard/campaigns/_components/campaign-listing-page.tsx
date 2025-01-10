"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignListing } from "./campaign-listing";
import PageContainer from "@/components/layout/page-container";

type CampaignData = {
  id: string;
  date: string;
  campaignName: string;
  subjectLine: string;
  owner: string;
  status: string;
  total_emails_sent: number;
  total_emails_delivered: number;
  total_emails_opened: number;
  total_clicks: number;
  deliverability: number;
  open_rate: number;
  clickthrough_rate: number;
};

type CampaignMetrics = {
  total_emails_sent: number;
  total_emails_delivered: number;
  total_emails_opened: number;
  total_clicks: number;
  deliverability: number;
  open_rate: number;
  clickthrough_rate: number;
};

export default function CampaignListingPage() {
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [metrics, setMetrics] = useState<CampaignMetrics | null>(null);
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
        setCampaigns(data);

        // Calculate totals and averages
        const totals = data.reduce(
          (acc: CampaignMetrics, campaign: CampaignData) => ({
            total_emails_sent:
              acc.total_emails_sent + campaign.total_emails_sent,
            total_emails_delivered:
              acc.total_emails_delivered + campaign.total_emails_delivered,
            total_emails_opened:
              acc.total_emails_opened + campaign.total_emails_opened,
            total_clicks: acc.total_clicks + campaign.total_clicks,
            deliverability: acc.deliverability + campaign.deliverability,
            open_rate: acc.open_rate + campaign.open_rate,
            clickthrough_rate:
              acc.clickthrough_rate + campaign.clickthrough_rate,
          }),
          {
            total_emails_sent: 0,
            total_emails_delivered: 0,
            total_emails_opened: 0,
            total_clicks: 0,
            deliverability: 0,
            open_rate: 0,
            clickthrough_rate: 0,
          },
        );

        // Calculate averages for rate metrics
        if (data.length > 0) {
          totals.deliverability /= data.length;
          totals.open_rate /= data.length;
          totals.clickthrough_rate /= data.length;
        }

        setMetrics(totals);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaignData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageContainer scrollable>
      <div className="space-y-4 space-x-4 mb-5">
        <h1 className="text-2xl font-bold ml-5">Campaign Overview</h1>
        {metrics && (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Sent
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                    <path d="m21.854 2.147-10.94 10.939" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.total_emails_sent.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-600 py-2">
                    +0.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Delivered
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    <path d="m16 19 2 2 4-4" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.deliverability.toFixed(2)}%
                  </div>
                  <div className="text-1xl font-bold pt-2">
                    {metrics.total_emails_delivered.toLocaleString()} Delivered
                  </div>
                  <p className="text-xs text-red-700 py-2">
                    -0.0% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Opened</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                    <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.open_rate.toFixed(2)}%
                  </div>
                  <div className="text-1xl font-bold pt-2">
                    {metrics.total_emails_opened.toLocaleString()} Total Opens
                  </div>
                  <p className="text-xs text-green-600 py-2">
                    +0.0% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clicked</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M14 4.1 12 6" />
                    <path d="m5.1 8-2.9-.8" />
                    <path d="m6 12-1.9 2" />
                    <path d="M7.2 2.2 8 5.1" />
                    <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.clickthrough_rate.toFixed(2)}%
                  </div>
                  <div className="text-1xl font-bold pt-2">
                    {metrics.total_clicks.toLocaleString()} Total Clicks
                  </div>
                  <p className="text-xs text-green-600 py-2">
                    +00% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8">
              <CampaignListing />
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
}
