"use client";

import { useCampaignTableFilters } from "./use-campaign-table-filters";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

interface CampaignTableActionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CampaignTableAction({
  searchQuery,
  onSearchChange,
}: CampaignTableActionProps) {
  return (
    <div className="flex items-center gap-2 ml-4">
      <Button variant="outline" size="sm">
        Export CSV
      </Button>
      <Button variant="outline" size="sm">
        Export PDF
      </Button>
    </div>
  );
}
