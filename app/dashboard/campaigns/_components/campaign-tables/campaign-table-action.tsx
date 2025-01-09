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
  return <div className="flex items-center gap-2"></div>;
}
