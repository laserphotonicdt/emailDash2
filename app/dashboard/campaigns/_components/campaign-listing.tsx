"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";
import { Campaign, columns } from "./campaign-tables/columns";
import { CampaignFilters } from "./campaign-tables/campaign-filters";
import { CampaignDataTable } from "./campaign-tables/campaign-data-table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function CampaignListing() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    campaign_name_id: false,
    total_emails_sent: false,
    total_emails_delivered: false,
    total_emails_opened: false,
    total_clicks: false,
    sender: false,
  });
  const [globalFilter, setGlobalFilter] = useState("");

  const {
    data: campaigns = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["campaigns", globalFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        search: globalFilter,
      }).toString();

      const response = await fetch(`/api/campaigns?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch campaigns");
      }

      return data.map((campaign: any) => ({
        id: campaign.id,
        date: campaign.date,
        campaign_name_id: campaign.campaign_name,
        subjectLine: campaign.subject_line,
        owner: campaign.owner,
        status: campaign.status,
        total_emails_sent: campaign.total_emails_sent,
        total_emails_delivered: campaign.total_emails_delivered,
        total_emails_opened: campaign.total_emails_opened,
        total_clicks: campaign.total_clicks,
        deliverability: campaign.deliverability,
        open_rate: campaign.open_rate,
        clickthrough_rate: campaign.clickthrough_rate,
        industryVertical: campaign.industry_vertical,
        senderUrl: campaign.sender_url,
      }));
    },
  });

  const table = useReactTable({
    data: campaigns,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    enableSorting: true,
    enableMultiSort: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "An error occurred while fetching campaigns"}
          </AlertDescription>
        </Alert>
      )}
      <CampaignFilters
        table={table}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />
      <CampaignDataTable
        columns={columns}
        data={campaigns}
        isLoading={isLoading}
        table={table}
      />
    </div>
  );
}
