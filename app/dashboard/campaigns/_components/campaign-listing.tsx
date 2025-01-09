"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/table/data-table";
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
      return response.json();
    },
  });

  const table = useReactTable({
    data: campaigns,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <CampaignFilters
          table={table}
          filters={filters}
          onFilterChange={setFilters}
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
      />
    </div>
  );
}
