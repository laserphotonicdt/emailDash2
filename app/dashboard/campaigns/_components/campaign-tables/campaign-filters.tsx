"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getColumn("industryVertical") && (
              <DropdownMenuCheckboxItem
                checked={!!filters.industry}
                onCheckedChange={(value) =>
                  onFilterChange({ ...filters, industry: value ? "true" : "" })
                }
              >
                Industry
              </DropdownMenuCheckboxItem>
            )}
            {table.getColumn("owner") && (
              <DropdownMenuCheckboxItem
                checked={!!filters.owner}
                onCheckedChange={(value) =>
                  onFilterChange({ ...filters, owner: value ? "true" : "" })
                }
              >
                Owner
              </DropdownMenuCheckboxItem>
            )}
            {table.getColumn("status") && (
              <DropdownMenuCheckboxItem
                checked={!!filters.status}
                onCheckedChange={(value) =>
                  onFilterChange({ ...filters, status: value ? "true" : "" })
                }
              >
                Status
              </DropdownMenuCheckboxItem>
            )}
            {table.getColumn("senderUrl") && (
              <DropdownMenuCheckboxItem
                checked={!!filters.mailServer}
                onCheckedChange={(value) =>
                  onFilterChange({
                    ...filters,
                    mailServer: value ? "true" : "",
                  })
                }
              >
                Mail Server
              </DropdownMenuCheckboxItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
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
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => {
                      column.toggleVisibility(!!value);
                      onColumnVisibilityChange(
                        table.getState().columnVisibility,
                      );
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
