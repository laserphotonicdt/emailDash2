"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { CampaignListing } from "./campaign-listing";
import PageContainer from "../../../../components/layout/page-container";

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
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">
                    {metrics.total_emails_sent.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Delivered</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">
                    {metrics.total_emails_delivered.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Opened</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">
                    {metrics.total_emails_opened.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">
                    {metrics.total_clicks.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Deliverability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">
                    {metrics.deliverability.toFixed(2)}%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Open Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">
                    {metrics.open_rate.toFixed(2)}%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Click Through</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">
                    {metrics.clickthrough_rate.toFixed(2)}%
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
