"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type Campaign = {
  id: string;
  date: string;
  campaign_name_id: string;
  subjectLine: string;
  owner: string;
  status: string;
  total_emails_sent: number;
  total_emails_delivered: number;
  total_emails_opened: number;
  total_clicks: number;
  deliverability: number;
  open_rate: number;
  clickthrough_rate: number;
};

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "date",
    header: "Date",
    enableHiding: true,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "campaign_name_id",
    header: "Campaign ID",
    enableHiding: true,
  },
  {
    accessorKey: "subjectLine",
    header: "Subject Line",
    enableHiding: true,
  },
  {
    accessorKey: "owner",
    header: "Owner",
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableHiding: true,
  },
  {
    accessorKey: "total_emails_sent",
    header: "Sent",
    enableHiding: true,
  },
  {
    accessorKey: "total_emails_delivered",
    header: "Delivered",
    enableHiding: true,
  },
  {
    accessorKey: "total_emails_opened",
    header: "Opened",
    enableHiding: true,
  },
  {
    accessorKey: "total_clicks",
    header: "Clicks",
    enableHiding: true,
  },
  {
    accessorKey: "deliverability",
    header: "Deliverability",
    enableHiding: true,
    cell: ({ row }) => {
      const value = Number(row.getValue("deliverability"));
      return <div className="font-medium">{value.toFixed(2)}%</div>;
    },
  },
  {
    accessorKey: "open_rate",
    header: "Open Rate",
    enableHiding: true,
    cell: ({ row }) => {
      const value = Number(row.getValue("open_rate"));
      return <div className="font-medium">{value.toFixed(2)}%</div>;
    },
  },
  {
    accessorKey: "clickthrough_rate",
    header: "Click Through",
    enableHiding: true,
    cell: ({ row }) => {
      const value = Number(row.getValue("clickthrough_rate"));
      return <div className="font-medium">{value.toFixed(2)}%</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
