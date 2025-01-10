"use client";

import { useCampaignTableFilters } from "./use-campaign-table-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      <Input
        placeholder="Search campaigns..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-8 w-[150px] lg:w-[250px]"
      />
      <Button variant="outline" size="sm">
        Export CSV
      </Button>
      <Button variant="outline" size="sm">
        Export PDF
      </Button>
    </div>
  );
}
