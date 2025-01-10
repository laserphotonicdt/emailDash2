"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ArrowUpDown } from "lucide-react";

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
  industryVertical: string;
  senderUrl: string;
};

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "date",
    header: "Date",
    enableHiding: true,
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue("date"));
      const dateB = new Date(rowB.getValue("date"));
      return dateA.getTime() - dateB.getTime();
    },
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
    enableSorting: true,
  },
  {
    accessorKey: "subjectLine",
    header: "Subject Line",
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "owner",
    header: "Owner",
    enableHiding: true,
    enableSorting: true,
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
    enableSorting: true,
  },
  {
    accessorKey: "total_emails_delivered",
    header: "Delivered",
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "total_emails_opened",
    header: "Opened",
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "total_clicks",
    header: "Clicks",
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "deliverability",
    header: "Deliverability",
    enableHiding: true,
    enableSorting: true,
    cell: ({ row }) => {
      const value = Number(row.getValue("deliverability"));
      return <div className="font-medium">{value.toFixed(2)}%</div>;
    },
  },
  {
    accessorKey: "open_rate",
    header: "Open Rate",
    enableHiding: true,
    enableSorting: true,
    cell: ({ row }) => {
      const value = Number(row.getValue("open_rate"));
      return <div className="font-medium">{value.toFixed(2)}%</div>;
    },
  },
  {
    accessorKey: "clickthrough_rate",
    header: "Click Through",
    enableHiding: true,
    enableSorting: true,
    cell: ({ row }) => {
      const value = Number(row.getValue("clickthrough_rate"));
      return <div className="font-medium">{value.toFixed(2)}%</div>;
    },
  },
  {
    accessorKey: "industryVertical",
    header: "Industry",
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "senderUrl",
    header: "Sender URL",
    enableHiding: true,
    enableSorting: true,
    cell: ({ row }) => {
      const url = row.getValue("senderUrl") as string;
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          {url}
        </a>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
