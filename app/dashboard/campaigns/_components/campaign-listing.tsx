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
import { CampaignTableAction } from "./campaign-tables/campaign-table-action";
import { CampaignFilters } from "./campaign-tables/campaign-filters";
import { CampaignDataTable } from "./campaign-tables/campaign-data-table";

export function CampaignListing() {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ["campaigns", filters, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...filters,
        search: searchQuery,
      }).toString();

      const response = await fetch(`/api/campaigns?${params}`);
      const data = await response.json();

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
    },
    enableSorting: true,
    enableMultiSort: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <CampaignFilters
          table={table}
          filters={filters}
          onFilterChange={setFilters}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
        <CampaignTableAction
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>
      <CampaignDataTable
        columns={columns}
        data={campaigns}
        isLoading={isLoading}
        table={table}
      />
    </div>
  );
}
