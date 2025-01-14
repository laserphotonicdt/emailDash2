"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Campaign } from "./columns";
import { CampaignViewSheet } from "./campaign-view-sheet";

interface CellActionProps {
  data: Campaign;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(data.id)}
          >
            Copy campaign ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsSheetOpen(true)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem disabled>Edit</DropdownMenuItem>
          <DropdownMenuItem disabled className="text-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CampaignViewSheet
        campaign={data}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </>
  );
};
