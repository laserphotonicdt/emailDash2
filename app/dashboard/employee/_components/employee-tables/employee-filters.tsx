"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { useEmployeeTableFilters } from "./use-employee-table-filters";

export function EmployeeFilters() {
  const {
    searchQuery,
    setSearchQuery,
    positionFilter,
    setPositionFilter,
    dateRangeFilter,
    setDateRangeFilter,
    adminFilter,
    setAdminFilter,
    resetFilters,
    isAnyFilterActive,
  } = useEmployeeTableFilters();

  const currentSearchQuery = searchQuery ?? "";
  const currentPositionFilter = positionFilter ?? "";
  const currentAdminFilter = adminFilter ?? "";
  const currentDateRangeFilter = dateRangeFilter ?? {
    from: undefined,
    to: undefined,
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search by name..."
          value={currentSearchQuery}
          onChange={(e) => setSearchQuery(e.target.value || null)}
          className="max-w-sm"
        />

        <Select
          value={currentPositionFilter}
          onValueChange={(value) => setPositionFilter(value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="hr">HR</SelectItem>
            <SelectItem value="analyst">Analyst</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={currentAdminFilter}
          onValueChange={(value) => setAdminFilter(value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Admin Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Admin</SelectItem>
            <SelectItem value="false">Not Admin</SelectItem>
          </SelectContent>
        </Select>

        <DateRangePicker
          value={currentDateRangeFilter}
          onChange={(range) => setDateRangeFilter(range || null)}
        />
      </div>

      {isAnyFilterActive && (
        <Button variant="ghost" onClick={resetFilters} className="w-fit">
          Clear Filters
        </Button>
      )}
    </div>
  );
}
