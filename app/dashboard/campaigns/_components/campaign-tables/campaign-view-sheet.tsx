"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Campaign } from "./columns";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface CampaignViewSheetProps {
  campaign: Campaign;
  isOpen: boolean;
  onClose: () => void;
}

export const CampaignViewSheet: React.FC<CampaignViewSheetProps> = ({
  campaign,
  isOpen,
  onClose,
}) => {
  // Transform campaign data for email metrics chart
  const emailMetricsData = [
    {
      name: "Sent",
      value: campaign.total_emails_sent,
    },
    {
      name: "Delivered",
      value: campaign.total_emails_delivered,
    },
    {
      name: "Opened",
      value: campaign.total_emails_opened,
    },
    {
      name: "Clicks",
      value: campaign.total_clicks,
    },
  ];

  // Transform campaign data for rates chart
  const ratesData = [
    {
      name: "Deliverability",
      value: campaign.deliverability,
    },
    {
      name: "Open Rate",
      value: campaign.open_rate,
    },
    {
      name: "CTR",
      value: campaign.clickthrough_rate,
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Campaign Details</SheetTitle>
          <SheetDescription>
            Detailed view of campaign performance metrics
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Campaign Information */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="grid grid-cols-2">
                <span className="font-medium">Campaign ID:</span>
                <span>{campaign.campaign_name_id}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Subject Line:</span>
                <span>{campaign.subjectLine}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Owner:</span>
                <span>{campaign.owner}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Status:</span>
                <span>{campaign.status}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Date:</span>
                <span>{new Date(campaign.date).toLocaleDateString()}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Industry:</span>
                <span>{campaign.industryVertical}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Sender URL:</span>
                <a
                  href={campaign.senderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {campaign.senderUrl}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Email Metrics Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Email Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={emailMetricsData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar
                      dataKey="value"
                      name="Count"
                      fill="#2563eb"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Rates Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ratesData}>
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Bar
                      dataKey="value"
                      name="Percentage"
                      fill="#16a34a"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};
