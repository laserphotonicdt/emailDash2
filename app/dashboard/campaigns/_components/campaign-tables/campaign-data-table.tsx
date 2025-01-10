"use client";

import {
  ColumnDef,
  flexRender,
  Table as TableType,
  Row,
  Header,
  Cell,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CampaignFilters } from "./campaign-filters";
import { exportToCSV } from "@/lib/data-utils";
import { Download } from "lucide-react";
import { Campaign } from "./columns";

interface DataTableProps<TData extends Campaign> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  table: TableType<TData>;
}

export function CampaignDataTable<TData extends Campaign>({
  columns,
  data,
  isLoading = false,
  table,
}: DataTableProps<TData>) {
  const handleExport = () => {
    const rows = table.getRowModel().rows;
    exportToCSV(rows, columns, "campaigns");
  };

  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          className="ml-2"
          onClick={handleExport}
        >
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table
              .getHeaderGroups()
              .map(
                (headerGroup: {
                  id: string;
                  headers: Header<TData, unknown>[];
                }) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(
                      (header: Header<TData, unknown>) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder ? null : (
                            <div
                              className={
                                header.column.getCanSort()
                                  ? "flex items-center space-x-2 cursor-pointer select-none"
                                  : ""
                              }
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              {header.column.getCanSort() && (
                                <span className="ml-2 relative w-4 h-4 text-muted-foreground">
                                  {header.column.getIsSorted() === "asc" && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="w-4 h-4 transition-transform"
                                    >
                                      <path d="m18 15-6-6-6 6" />
                                    </svg>
                                  )}
                                  {header.column.getIsSorted() === "desc" && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="w-4 h-4 transition-transform"
                                    >
                                      <path d="m6 9 6 6 6-6" />
                                    </svg>
                                  )}
                                  {!header.column.getIsSorted() && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="w-4 h-4 transition-transform opacity-50"
                                    >
                                      <path d="m6 9 6 6 6-6" />
                                    </svg>
                                  )}
                                </span>
                              )}
                            </div>
                          )}
                        </TableHead>
                      ),
                    )}
                  </TableRow>
                ),
              )}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<TData>) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
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
                  No campaigns found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}
