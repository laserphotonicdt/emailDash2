"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import type {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuCheckboxItemProps,
} from "./data-table.types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  pagination?: PaginationProps;
  children?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  pagination,
  children,
  columnVisibility,
  onColumnVisibilityChange,
}: DataTableProps<TData, TValue> & {
  columnVisibility: VisibilityState;
  onColumnVisibilityChange: OnChangeFn<VisibilityState>;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: onColumnVisibilityChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">{children}</div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="flex items-center justify-between px-2">
          <select
            value={pagination.pageSize}
            onChange={(e) => {
              pagination.setPageSize(Number(e.target.value));
            }}
            className="px-3 py-1 border rounded"
          >
            {pagination.pageOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 border rounded"
              onClick={() => pagination.setPageIndex(0)}
              disabled={!pagination.canPreviousPage}
            >
              {"<<"}
            </button>
            <button
              className="px-3 py-1 border rounded"
              onClick={() => pagination.setPageIndex(pagination.pageIndex - 1)}
              disabled={!pagination.canPreviousPage}
            >
              {"<"}
            </button>
            <span className="px-3 py-1">
              Page {pagination.pageIndex + 1} of {pagination.pageCount}
            </span>
            <button
              className="px-3 py-1 border rounded"
              onClick={() => pagination.setPageIndex(pagination.pageIndex + 1)}
              disabled={!pagination.canNextPage}
            >
              {">"}
            </button>
            <button
              className="px-3 py-1 border rounded"
              onClick={() => pagination.setPageIndex(pagination.pageCount - 1)}
              disabled={!pagination.canNextPage}
            >
              {">>"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

DataTable.Toolbar = function Toolbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2">{children}</div>
  );
};
