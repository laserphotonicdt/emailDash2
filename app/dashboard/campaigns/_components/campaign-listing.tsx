"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { DataTable } from "../../../../components/ui/table/data-table";
import { Campaign, columns } from "./campaign-tables/columns";
import { CampaignTableAction } from "./campaign-tables/campaign-table-action";
import { CampaignFilters } from "./campaign-tables/campaign-filters";

export function CampaignListing() {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

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
        campaignName: campaign.campaign_name,
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
      }));
    },
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data: campaigns,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
      columnVisibility,
    },
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
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
      <DataTable<Campaign, unknown>
        columns={columns}
        data={campaigns}
        isLoading={isLoading}
        pagination={{
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          pageCount: table.getPageCount(),
          setPageIndex: table.setPageIndex,
          setPageSize: table.setPageSize,
          canPreviousPage: table.getCanPreviousPage(),
          canNextPage: table.getCanNextPage(),
          pageOptions: [10, 25, 50, 100, 200],
        }}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />
    </div>
  );
}
