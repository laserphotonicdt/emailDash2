import { ColumnDef } from "@tanstack/react-table";
import { Campaign } from "@/app/dashboard/campaigns/_components/campaign-tables/columns";

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
}

export interface DataTableToolbarProps<TData> {
  filters?: Record<string, string>;
  onFilterChange?: (filters: Record<string, string>) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}
