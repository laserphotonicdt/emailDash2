"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Eye } from "lucide-react";
import { Table, type VisibilityState } from "@tanstack/react-table";
import { useState } from "react";

interface CampaignFiltersProps<TData> {
  table: Table<TData>;
  filters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
  columnVisibility: VisibilityState;
  onColumnVisibilityChange: (visibility: VisibilityState) => void;
}

export function CampaignFilters<TData>({
  table,
  filters,
  onFilterChange,
  columnVisibility,
  onColumnVisibilityChange,
}: CampaignFiltersProps<TData>) {
  return (
    <div className="flex items-center justify-between size-full">
      <div className="flex gap-2 mr-2">
        <Input
          placeholder="Search campaigns..."
          value={filters.search || ""}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 px-2">
              <Eye className="mr-2 h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={columnVisibility[column.id] !== false}
                    onCheckedChange={(value) => {
                      const newVisibility = {
                        ...columnVisibility,
                        [column.id]: value,
                      };
                      onColumnVisibilityChange(newVisibility);
                    }}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
