"use client";

import { useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  RowSelectionState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  Table as TableType,
  Row,
  Header,
  Cell,
} from "@tanstack/react-table";
import { Campaign } from "./columns";

export function useCampaignTableFilters(data: Campaign[]) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns: data && data.length > 0 ? Object.values(Campaign) : [], // Ensure columns are defined
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel,
    getPaginationRowModel: getPaginationRowModel,
    getSortedRowModel: getSortedRowModel,
    getFilteredRowModel: getFilteredRowModel,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return {
    table,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
  };
}
