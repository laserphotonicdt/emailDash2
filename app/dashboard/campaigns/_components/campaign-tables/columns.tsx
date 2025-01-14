import { createColumnHelper } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export interface Campaign {
  id: string;
  campaign_name_id: string;
  subjectLine: string;
  owner: string;
  status: string;
  date: string;
  industryVertical: string;
  senderUrl: string;
  total_emails_sent: number;
  total_emails_delivered: number;
  total_emails_opened: number;
  total_clicks: number;
  deliverability: number;
  open_rate: number;
  clickthrough_rate: number;
}

const columnHelper = createColumnHelper<Campaign>();

export const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
  }),
  columnHelper.accessor("campaign_name_id", {
    header: "Campaign ID",
  }),
  columnHelper.accessor("subjectLine", {
    header: "Subject Line",
  }),
  columnHelper.accessor("owner", {
    header: "Owner",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("industryVertical", {
    header: "Industry",
  }),
  columnHelper.accessor("total_emails_sent", {
    header: "Sent",
  }),
  columnHelper.accessor("deliverability", {
    header: "Deliverability",
    cell: ({ getValue }) => `${getValue()}%`,
  }),
  columnHelper.accessor("open_rate", {
    header: "Open Rate",
    cell: ({ getValue }) => `${getValue()}%`,
  }),
  columnHelper.accessor("clickthrough_rate", {
    header: "CTR",
    cell: ({ getValue }) => `${getValue()}%`,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  }),
];
